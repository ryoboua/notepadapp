import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { sendAPIError } from '../helpers/APIError'

function login(req, res, next) {
    if ( req.body.email && req.body.password ) {
        //retrieve username and password from body
        const { email, password } = req.body
        //find document with same email address in db
        User.findOne({ email }, function(err, user) {
            if (err) sendAPIError(err, 500, next)
            //if no user is returned, return 400 error
            if (!user) {
                sendAPIError(`Sorry, there doesn't seem to be an account assoicated with the email provided.`, 400, next, 'email')
            } else {
                //if user is returned, check if password matches the one stored in the db
                user.comparePassword(password, function(err, matches) {
                    if (err) sendAPIError(err, 500, next)
                    if (matches) {
                        //remove password from user 
                        //add user to request object
                        //and call next middleware
                        user.password = undefined
                        req.user = user
                        next()
                    } else {
                        //if incorrect password send authentication error
                        sendAPIError('Incorrect password.', 400, next, 'password')
                    }
                })
            }
        })
    } else {
        next()
    } 
}

function issueJWT(req, res, next) {
    if (req.user) {
        const { _id, name } = req.user
        //create jwt with user if and name encoded
        // set to expire in 1h
        jwt.sign({ user_id: _id, name }, config.jwtSecret, { expiresIn: '1h' },
         (err, token) => {
            if (err){
                sendAPIError(err, 500, next)
            } else {
                req.token = token
                next()
            }
          });
    }
}

function verifyJWT(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization']
    // check is bearHeader is undefined
    if(typeof bearerHeader !== 'undefined') {
        //retrieve token from header
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
                    //add user to request
                    User.findById(authData.user_id, function(err, user) {
                        if (err) {
                            sendAPIError(err, 400, next)
                        } else if (user) {
                            user.password = undefined
                            req.user = user
                            next()
                            } else {
                            sendAPIError('Unable to update user', 400, next)
                        }
                    })                        
                }
            })
    } else {
        // no bearerHeader provided
        res.sendStatus(403);
    }
}

function checkUserParams(req, res, next) {
    if (req.params.user_id === req.user_id) {
        next()
    } else {
        res.sendStatus(403)   
    }
}

module.exports = { login, verifyJWT, issueJWT, checkUserParams }