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
    const { user_id } = req;
    const { name, email ,password } = req.body
 
    User.findById(user_id, function(err, user) {
        if (err) {
            req.err = {
                message: err,
                status: 400,
            }
            next()
        } else if (user) {
            user.set({
                name,
                email,
                password,
            })
            user.save(function(err, updatedUser) {
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
