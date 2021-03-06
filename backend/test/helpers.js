const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const validUserDataAndJWT = (actualUser, expectedUser, JWT) => {
    expect(actualUser.name).to.equal(expectedUser.name)
    expect(actualUser.email).to.equal(expectedUser.email)
    expect(actualUser).to.not.have.property('password')
    jwt.verify(JWT, config.jwtSecret, 
        (err, authData) => {
            expect(err).to.not.be.ok
            expect(authData.name).to.equal(expectedUser.name)
            expect(authData).to.have.property('user_id')
        })
}

module.exports = { validUserDataAndJWT }