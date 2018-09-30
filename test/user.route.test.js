const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')
const testHelpers = require('./helpers')
const mongoURI = config.mongo.host;
let loggedInUser = {}
beforeAll(async done => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoURI}`) })

    const MockUser = new User(testUser.validUserCredentials)
    MockUser.save(async function(err, result){
        if (err) throw err

        testUser.validUserCredentials.id = result._id
        await request('http://localhost:3000/auth/login')
        .post('')
        .send(testUser.validUserCredentials)
        .then( res => {
            loggedInUser = {
                user: res.body.user,
                JWTToken: res.body.JWTToken
            }
            done()
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
        expect(loggedInUser).to.have.property('user')
        expect(loggedInUser).to.have.property('JWTToken')
        expect(loggedInUser.JWTToken).to.be.a('string')
        expect(loggedInUser.user.name).to.be.equal(testUser.validUserCredentials.name)
        //expect(loggedInUser.user._id).to.be.equal(testUser.validRegistrationCredentials.id)
        done()
        // request(`http://localhost:3000/users/${loggedInUser.user._id}`)
        // .post('')
        // .set('authorization', `Bearer ${loggedInUser.JWTToken}`)
        // .expect(200)
        // .then(res => {
        //     expect(res.body).to.equal(loggedInUser.user._id)
        //     done()
        // })
    })
})
//describe('# POST /register')


