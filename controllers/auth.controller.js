import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'


function login(req, res, next) {
    if ( req.body.email && req.body.password ) {
        //retrieve username and password from body
        const { email, password } = req.body
        //find document with same email address in db
        User.findOne({ email }, function(err, user) {
            if (err) next(err);
            //if no user is returned, return 400 error
            if (!user) {
                let APIError = {
                    message: 'Authentication error',
                    status: 400,
                } 
                next(APIError)
            } else {
                //if user is returned, check if password matches the one stored in the db
                user.comparePassword(password, function(err, matches) {
                    if (err) next(err);
                    if (matches) {
                        req.user = user
                        next()
                    } else {
                        let APIError = {
                            message: 'Authentication error',
                            status: 400,
                        }
                        next(APIError)
                    }
                })
            }
        })
    } else {
        next()
    }
    
}

function issueJwtToken(req, res, next) {
    // if (req.err) {
    //     const { status, message } = req.err
    //     res.status(status).send(message)
    // }
    if (req.user) {
        const { _id } = req.user
        jwt.sign({ user_id: _id }, config.jwtSecret, { expiresIn: '1h' },
         (err, token) => {
            if (err){
                next(err)
            } else {
                req.token = token
                next()
            }
          });
    }
}

function verifyJwtToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization']
    // check is bearHeader is undefined
    if(typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, config.jwtSecret, 
            (err, authData) => {
                if(err) {
                    //invalid token
                    res.sendStatus(403)
                } else {
                    //token verified
                    //call next middleware
                    req.user_id = authData.user_id
                    next()
                }
            })
    } else {
        // no bearerHeader provided
        res.sendStatus(403);
    }
}

function checkUserParams(req, res, next) {
    //if the userId provided by the verifyJwtToken matches the userId in the params
    // continue
    if (req.user_id === req.params.user_id) {
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = { login, verifyJwtToken, issueJwtToken, checkUserParams }