const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function validUserDataAndJWTToken (actualUser, expectedUser, JWTToken) {
    expect(actualUser.name).to.equal(expectedUser.name)
    expect(actualUser.email).to.equal(expectedUser.email)
    expect(actualUser).to.not.have.property('password')
    jwt.verify(JWTToken, config.jwtSecret, 
        (err, authData) => {
            expect(err).to.not.be.ok
            expect(authData.name).to.equal(expectedUser.name)
            expect(authData).to.have.property('user_id')
        })
}

module.exports = { validUserDataAndJWTToken }