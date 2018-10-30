import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { checkIfEmailAlreadyInUse } from '../helpers/user.helper'
const saltRounds = 10;

// Note Schema
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    backgroundColor: {
        type: String,
        default: '#ffffff'
    },
})
// everytime we update a note, we update the lastUpdated value to the current time
// no need to send timestamp from the client
NoteSchema.pre('save', function(next){
    const note = this;
    if(note.isModified()) {
        note.lastUpdated = Date.now()
        next()
    } else {
        next()
    }
})

//User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            isAsync: true,
            validator: checkIfEmailAlreadyInUse,
            message:  'This email address is already taken.'
        },
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    notes: [ NoteSchema ]
})
// Hash password before every same in db
UserSchema.pre('save', function hashPassword(next) {
    const user = this;
    if (!user.isModified('password')) next()

    bcrypt.hash(this.password, saltRounds, function(err, hash) {
        if(err) console.log('Unable to hash password', err)
        user.password = hash
        next()
      })
})
// Compare password for login
UserSchema.methods.comparePassword = function(givenPassword, cb) {
    bcrypt.compare(givenPassword, this.password, function(err, matches) {
        if (err) return cb(err);
        cb(null, matches);
    })
}

module.exports = mongoose.model('User', UserSchema)