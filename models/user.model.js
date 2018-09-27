import mongoose from 'mongoose';
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

const checkIfEmailAlreadyInUse = function(value, isValid) {
    const self = this;
    return self.constructor.findOne({ email: value })
    .exec(function(err, user){
        if(err){
            throw err;
        }
        else if(user) {
            if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                return isValid(true);
            }
            return isValid(false);  
        }
        else{
            return isValid(true);
        }
    })
}
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
            message:  'The email address is already taken!'
        },
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
// Compare password for login
UserSchema.methods.comparePassword = function(givenPassword, cb) {
    bcrypt.compare(givenPassword, this.password, function(err, matches) {
        if (err) return cb(err);
        cb(null, matches);
    })
}

export default mongoose.model('User', UserSchema)