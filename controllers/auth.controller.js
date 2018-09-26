import User from '../models/user.model'

function login(req, res, next) {
    //retrieve username and password from body
    const { email, password } = req.body
    //find document with same email address in db
    User.findOne({ email }, function(err, user) {
        if (err) console.log('error', err);
        //if no user is returned, return 400 error
        if (!user) {
            req.err = {
                message: 'No accounts found with that email address',
                status: 400,
            } 
            next()
        } else {
            //if user is returned, check if password matches the one stored in the db
            user.comparePassword(password, function(err, matches) {
                if (err) console.log('error', err);
                if (matches) {
                    req.user = user
                    next()
                } else {
                    req.err = {
                        message: 'Password provided is incorrect',
                        status: 400,
                    }
                    next()
                }
            })
        }
    })
}

export default { login }