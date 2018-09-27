import User from '../models/user.model'

function createUser(req, res, next) {
    const { name, email , password } = req.body
    const user = new User({
        name,
        email,
        password,
    })
    user.save(function(err, result){
        if (err) {
            req.err = {
                message: err.errors.email.message,
                status: 400,
            }
            next()
        } else {
            req.user = result
            next()
        }
    })
}

function updateUser(req, res, next) {
    const user = req.user;
    const { name, email ,password } = req.body
    user.name = name
    user.email = email
    user.password = password

    User.findById(user._id, function(err, userToUpdate){
        if (err) {
            req.err = {
                message: err,
                status: 400,
            }
            next()
        } else if (userToUpdate) {
            userToUpdate.set({
                name: user.name,
                email: user.email,
                password: user.password,
            })
            userToUpdate.save(function(err, updatedUser) {
                if (err) {
                    req.err = {
                        message: err,
                        status: 400,
                    }
                    next()
                } else {
                    res.send(updatedUser)   
                }
            })
        } else {
            req.err = {
                message: 'Unable to update user',
                status: 400,
            }
            next()
        }
    })
}

export default { createUser, updateUser}
