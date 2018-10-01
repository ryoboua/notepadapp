const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')
const testHelpers = require('./helpers')


const mongoURI = config.mongo.host;
let loggedInUser = {}
const batman = {
    name: 'Batman',
    email: 'test@yahoo.com',
    password: '123temp'
}

beforeAll(async done => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoURI}`) })
    const existingMockerUser = new User(testUser.existingValidUser)
    await existingMockerUser.save()
    const MockUser = new User(testUser.validUserCredentials)
    MockUser.save( async function(err, result) {
        if (err) throw err
        testUser.validUserCredentials.id = result.id
        await request('http://localhost:3000/auth/login')
        .post('')
        .send(testUser.validUserCredentials)
        .then( res => {
            expect(res.body).to.have.property('user')
            expect(res.body).to.have.property('JWTToken')
            expect(res.body.JWTToken).to.be.a('string')
            expect(res.body.user._id).to.be.a('string')

            loggedInUser = {
                user: res.body.user,
                JWTToken: res.body.JWTToken
            }

            expect(loggedInUser).to.have.property('user')
            expect(loggedInUser).to.have.property('JWTToken')
            expect(loggedInUser.JWTToken).to.be.a('string')
            expect(loggedInUser.user._id).to.be.a('string')
            expect(loggedInUser.user._id).to.be.equal(testUser.validUserCredentials.id)
            expect(loggedInUser.user.name).to.be.equal(testUser.validUserCredentials.name)
            expect(loggedInUser.user.email).to.be.equal(testUser.validUserCredentials.email)
            return done()
        })
        .catch(err => { throw err })
    })
})

afterAll(async done => {
    await User.remove({})
    mongoose.disconnect(done)
  })

describe('# GET /users/:user_id', () => {
    it('should return user *** full login test', done => {
        return request(`http://localhost:3000/users/${loggedInUser.user._id}`)
        .get('')
        .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
        .expect(200)
        .then(res => {
            expect(res.body.user_id).to.equal(loggedInUser.user._id)
            return done()
        })
    })
})

describe('# POST /users/:user_id', () => {
    it('Should return updated user with new JWTToken', done => {
        return request(`http://localhost:3000/users/${loggedInUser.user._id}`)
                .post('')
                .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
                .send(batman)
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('JWTToken')
                    const { user ,JWTToken} = res.body
                    expect(user._id).to.equal(loggedInUser.user._id)
                    testHelpers.validUserDataAndJWTToken(user, batman, JWTToken)
                    return done()
                })
   })

   it('Posting with invalid JWT & invalid user_id - should return - 403 Forbidden ', done => {
    return request(`http://localhost:3000/users/12343ffdf`)
            .post('')
            .set('authorization', `Bearer 123`)
            .send(batman)
            .expect(403)
            .then(res => {
                return done()
            })
    })

    // it('Posting with valid JWT & invalid user_id - should return - 400 ', done => {
    //     return request(`http://localhost:3000/users/${testUser.validJWTToken.user_id}`)
    //             .post('')
    //             .set('authorization', `Bearer ${testUser.validJWTToken.token}`)
    //             .send(batman)
    //             .expect(400)
    //             .then(res => {
    //                 expect(res.body).to.have.property('status', 400)
    //                 expect(res.body).to.have.property('message', 'Unable to update user')
    //                 return done()
    //             })
    //     })
    
    it('Posting with valid JWT & valid user_id but with nothing in body - should return - 400', done => {
        return request(`http://localhost:3000/users/${loggedInUser.user._id}`)
                .post('')
                .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
                .expect(400)
                .then(res => {
                    expect(res.body).to.have.property('status', 400)
                    expect(res.body).to.have.property('message', 'validation error')
                    return done()
                })
    })
    it('Posting with valid JWT & valid user_id but with empty strings - should return - 400', done => {
        return request(`http://localhost:3000/users/${loggedInUser.user._id}`)
                .post('')
                .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
                .send({
                    name: '',
                    email: '',
                    password: '',
                })
                .expect(400)
                .then(res => {
                    expect(res.body).to.have.property('status', 400)
                    expect(res.body).to.have.property('message', 'validation error')
                    return done()
                })
    })
    it('Updating user account with an email that already exists - should return - 400', done => {
        return request(`http://localhost:3000/users/${loggedInUser.user._id}`)
                .post('')
                .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
                .send(testUser.existingValidUser)
                .expect(400)
                .then(res => {
                    expect(res.body).to.have.property('status', 400)
                    expect(res.body).to.have.property('message')
                    return done()
                })
    })

})