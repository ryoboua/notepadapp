var expect = require('chai').expect
var request = require('supertest')
var testUser = require('./testUser')
var app = require('../server').app
var server = require('../server').server

afterAll((done) => {
  app.closeDbConnection()
  server.close()
  done()
})
describe('# POST /auth/login', () => {
  it('Should return json object with user data and JWTToken', done => {
    request(app)
      .post('/auth/login')
      .send(testUser.validCredentials)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('JWTToken');
        done()
      })
  })
//Authenticating with invalid password
  it('Invalid password - should return status 400 - Authentication error', done => {
    request(app)
      .post('/auth/login')
      .send(testUser.invalidPassword)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message')
        done()
      })
  });
//Authenticating with invalid email (account does not exit)
  it('Invalid email - should return status 400 - Authentication error', done => {
    request(app)
      .post('/auth/login')
      .send(testUser.invalidEmail)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message', 'Authentication error')
        done()
    })
  })
// Posting with no email or password parameters
  it('Posting with no email or password in body - should return status 400 - validation error', done => {
    request(app)
      .post('/auth/login')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status', 400)
        expect(res.body).to.have.property('message', 'validation error')
        done()
      })
  })
});