import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
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
    },
    password: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    notes: [ NoteSchema ]
})
// Hash password
UserSchema.pre('save', function hashPassword(next) {
    const user = this;
    if (!user.isModified('password')) next()

    bcrypt.hash(this.password, saltRounds, function(err, hash) {
        if(err) console.log('Unable to has password', err)
        user.password = hash
        next()
      })
})
// Check for duplicate email
UserSchema.pre('save', function checkForDuplicateEmails(next) {
    const email = this.email
    this.constructor.findOne({ email }).exec(function(err, user){
        if (err) throw err
        if(user){
            //TO DO: need to check id of the user for updates
            return httpStatus[400]
        } else {
            next();
        }
    })
})
// Compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(givenPassword, this.password, function(err, matches) {
        if (err) return cb(err);
        cb(null, matches);
    })
}

export default mongoose.model('User', UserSchema)