var expect = require('chai').expect
var request = require('supertest')
var testUser = require('./testUser')
var app = require('../server')

describe('# POST /register', () => {
    it('Should return email already in use', done => {
        request(app)
        .post('/register')
        .send(testUser.existingValidUser)
        .expect(400)
        done()
    })
})