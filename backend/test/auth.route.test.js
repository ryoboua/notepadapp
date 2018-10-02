const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')
const testHelpers = require('./helpers')
const mongoURI = config.mongo.host;

const login = request('http://localhost:3000/auth/login')

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

describe('# POST /auth/login', () => {
  it('Should return json object with user data and JWTToken', done => {
    return login
      .post('')
      .send(testUser.validUserCredentials)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('JWTToken');
        
        const { user, JWTToken } = res.body
        testHelpers.validUserDataAndJWTToken(user, testUser.validUserCredentials, JWTToken)
        done()
      })
      .catch(err => {
          done(err)
      });
  })
//Authenticating with invalid password
  it('Invalid password - should return status 400 - Authentication error', done => {
    return login
      .post('')
      .send(testUser.invalidPassword)
      .expect(400)
      .then(res => {
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message')
        done()
    })
    .catch(err => {
        done(err)
    });
  });
//Authenticating with invalid email (account does not exit)
  it('Invalid email - should return status 400 - Authentication error', done => {
    return login
      .post('')
      .send(testUser.invalidEmail)
      .expect(400)
      .then(res => {
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message', 'Authentication error')
        done()
      })
      .catch(err => {
          done(err)
      });
  })
// Posting with no email or password parameters
  it('Posting with no email or password in body - should return status 400 - validation error', done => {
    return login
      .post('')
      .expect(400)
      .then(res => {
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message', 'validation error')
        done()
      })
      .catch(err => {
          done(err)
      });
  })
})