const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')
const testHelpers = require('./helpers')
const mongoURI = config.mongo.host;
const register = request('http://localhost:3000/register')

beforeAll(async done => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoURI}`) })

    const MockUser = new User(testUser.validUserCredentials)
    MockUser.save(function(err, result){
        if (err) throw err
        done()
    })
})

afterAll(async done => {
    await User.remove({})
    mongoose.disconnect(done)
})

describe('# POST /register', () => {
    it('Should return email already in use', done => {
        return register
            .post('')
            .send(testUser.existingValidUser)
            .expect(400)
            .then(res => {
                expect(res.body).to.have.property('message', 'The email address is already taken!')
                expect(res.body).to.have.property('status', 400);
                done()
            })
            .catch(err => {
                done(err)
            });
    })
    it('Sending nothing in body should return validation error', done => {
        return register
            .post('')
            .expect(400)
            .then(res => {
                expect(res.body).to.have.property('message', 'validation error')
                expect(res.body).to.have.property('status', 400);
                done()
            })
            .catch(err => {
                done(err)
            });    
    })

    it('Successful registration should return should return json object with user data and JWTToken', done => {
        return register
            .post('')
            .send(testUser.validRegistrationCredentials)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('JWTToken');
                const { user, JWTToken } = res.body
                testHelpers.validUserDataAndJWTToken(user, testUser.validRegistrationCredentials, JWTToken)
                done()
            })
    })
})