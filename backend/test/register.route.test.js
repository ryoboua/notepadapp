const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')
const testHelpers = require('./helpers')
const mongoURI = config.mongo.host
const port = config.port

const register = request(`http://localhost:${port}/register`)
const registerDemoUser = request(`http://localhost:${port}/register/demouser`)

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
            .send(testUser.validUserCredentials)
            .expect(400)
            .then(res => {
                expect(res.body).to.have.property('message', 'This email address is already taken.')
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

    it('Successful registration should return should return json object with user data and JWT', done => {
        return register
            .post('')
            .send(testUser.validRegistrationCredentials)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('JWT');
                const { user, JWT } = res.body
                testHelpers.validUserDataAndJWT(user, testUser.validRegistrationCredentials, JWT)
                done()
            })
    })
    it('Should not be able to create a user with a password that is less than 8 characters in length', done => {
        return register
            .post('')
            .send(testUser.invalidPasswordLength)
            .expect(400)
            .then(res => {
                done()
            })
    })
    it('Should return 400 when trying to create a user with email domain @whoisreggie.ca', done => {
        return register
            .post('')
            .send({
                name: 'Reggie',
                email: 'test@whoisreggie.ca',
                password: 'test12345678'
            })
            .expect(400)
            .then(res => {
                expect(res.body).to.have.property('message', 'validation error')
                expect(res.body).to.have.property('status', 400)
                done()
            })
    })
})

describe('# POST /register/demouser', () => {
    const expectedName = 'Reggie'
    it('Should return demo1@whoisreggie.ca', done => {
        return registerDemoUser
            .post('')
            .send({ name: expectedName })
            .expect(200)
            .then( res => {
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('JWT');
                expect(res.body).to.have.property('isDemoUser', true)
                const { user, JWT } = res.body
                testHelpers.validUserDataAndJWT(user, { name: expectedName, email: 'demo1@whoisreggie.ca', password: config.demoUserPassword }, JWT)
                done()
            })

    })

    it('Should return demo2@whoisreggie.ca', done => {
        return registerDemoUser
            .post('')
            .send({ name: expectedName })
            .expect(200)
            .then( res => {
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('JWT');
                expect(res.body).to.have.property('isDemoUser', true)
                const { user, JWT } = res.body
                testHelpers.validUserDataAndJWT(user, { name: expectedName, email: 'demo2@whoisreggie.ca', password: config.demoUserPassword }, JWT)
                done()
            })

    })

    it('Should return demo3@whoisreggie.ca', done => {
        return registerDemoUser
            .post('')
            .send({ name: expectedName })
            .expect(200)
            .then( res => {
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('JWT');
                expect(res.body).to.have.property('isDemoUser', true)
                const { user, JWT } = res.body
                testHelpers.validUserDataAndJWT(user, { name: expectedName, email: 'demo3@whoisreggie.ca', password: config.demoUserPassword }, JWT)
                done()
            })
    })

    it('Should return demo6@whoisreggie.ca', done => {
        const demoUser4 = new User({
            name: 'dave',
            email: 'demo4@whoisreggie.ca',
            password: '12345678'
        })
        return demoUser4.save(function(err, result){
            if (err) throw err
            const demoUser5 = new User({
                name: 'dave',
                email: 'demo5@whoisreggie.ca',
                password: '12345678'
            })
            demoUser5.save(function(err, result){
                if (err) throw err
                return registerDemoUser
                .post('')
                .send({ name: expectedName })
                .expect(200)
                .then( res => {
                    expect(res.body).to.have.property('user');
                    expect(res.body).to.have.property('JWT');
                    expect(res.body).to.have.property('isDemoUser', true)
                    const { user, JWT } = res.body
                    testHelpers.validUserDataAndJWT(user, { name: expectedName, email: 'demo6@whoisreggie.ca', password: config.demoUserPassword }, JWT)
                    done()
                })
            })
        })
    })

    it('Posting with empty string as name should return 400', done => {
        return registerDemoUser
            .post('')
            .send({ name: '' })
            .expect(400)
            .then( res => {
               done()
            })

    })
})