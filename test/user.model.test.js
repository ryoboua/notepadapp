const expect = require('chai').expect
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/user.model')

//Global test variables
const mongoURI = config.mongo.host;
const testUser = {
    name: 'John',
    email: 'test@gmail.com',
    password: 'temp123',
    notes: [
        { 
            title: 'Note1',
            content: 'long text...',
         },
    ]
}

let testUserId = ''
let testNoteId = ''

beforeAll(async done => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoURI}`) })
    const MockUser = new User(testUser)
    MockUser.save( async function(err, result) {
        if (err) throw err
        expect(result).to.have.property('name', 'John')
        expect(result).to.have.property('id')
        expect(result).to.have.property('notes')
        testUserId = result.id
        testNoteId = result.notes[0].id
        expect(testNoteId).to.not.be.equal('')
        return done()
    })
})

afterAll(async done => {
    await User.remove({})
    mongoose.disconnect(done)
  })

describe('User Model Test', () => {
    it('Can create a note', async done => {
        return User.findById(testUserId, async function(err, user) {
            if (err) throw err
            user.notes.push({
                title: 'Note2',
                content: 'short text...'
            })
            user.save(function(err, updatedUser) {
                if (err) throw err
                expect(updatedUser.notes).to.be.an('array').of.length(2)
                return done()
            })
        })
    })
    it('Can delete note', async done => {
        return User.findById(testUserId, async function( err, user ) {
            if (err) throw err

            user.notes.id(testNoteId).remove()
            user.save(function(err, user) {
                if (err) throw err
                expect(user.notes).to.be.an('array').of.length(1)
                return done()
            })
        })
    })
    it('Can update note', async done => {
        return User.findById(testUserId, async function( err, user ) {
            if (err) throw err
            user.notes.map( n => n.title = 'updated')
            user.save(function(err, user) {
                if (err) throw err
                expect(user.notes[0]).to.have.property('title', 'updated')
                return done()
            })
        })
    })
})