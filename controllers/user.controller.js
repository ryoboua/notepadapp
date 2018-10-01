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
            let APIError = {
                message: err.errors.email.message,
                status: 400,
            }
            next(APIError)
        } else {
            //remove password from user payload
            result.password = undefined
            req.user = result
            next()
        }
    })
}
function createUserResponse(req, res, next) {
    if (req.user && req.token) {
        res.json({
            user: req.user,
            JWTToken: req.token,
        })
    } else {
        next()
    }
}

function updateUser(req, res, next) {
    const { user_id } = req;
    const { name, email , password } = req.body
 
    User.findById(user_id, function(err, user) {
        if (err) {
            let APIError = {
                message: err,
                status: 400,
            }
            next(APIError)
        } else if (user) {
            user.set({
                name,
                email,
                password,
            })
            user.save(function(err, updatedUser) {
                if (err) {
                    let APIError = {
                        message: err,
                        status: 400,
                    }
                    next(APIError)
                } else {
                    //remove password from user payload
                    updatedUser.password = undefined
                    req.user = updatedUser;
                    next()   
                }
            })
                } else {
                    let APIError = {
                        message: 'Unable to update user',
                        status: 400,
            }
            next(APIError)
        }
    })
}

module.exports = { createUser, updateUser, createUserResponse}
