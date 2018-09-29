const expect = require('chai').expect
const request = require('supertest')
const testUser = require('./testUser')

const login = request('http://localhost:3000/auth/login')

describe('# POST /auth/login', () => {
  it('Should return json object with user data and JWTToken', done => {
    login
      .post('')
      .send(testUser.validCredentials)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('JWTToken');
        done()
      })
      .catch(err => {
          done(err)
      });
  })
//Authenticating with invalid password
  it('Invalid password - should return status 400 - Authentication error', done => {
    login
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
    login
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
    login
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