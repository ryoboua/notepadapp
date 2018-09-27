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

export default { createUser }