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
                sendAPIError('Authentication error', 400, next)
            } else {
                //if user is returned, check if password matches the one stored in the db
                user.comparePassword(password, function(err, matches) {
                    if (err) sendAPIError(err, 500, next)
                    if (matches) {
                        //remove password from user 
                        user.password = undefined
                        req.user = user
                        next()
                    } else {
                        sendAPIError('Authentication error', 400, next)
                    }
                })
            }
        })
    } else {
        next()
    }
    
}

function issueJwtToken(req, res, next) {
    if (req.user) {
        const { _id, name } = req.user
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
                    //verify that user id matches the one in params
                    //call next middleware
                    //TODO - write test case that breaks this
                    if (authData.user_id === req.params.user_id) {
                        req.user_id = authData.user_id
                        next()
                    } else {
                        res.sendStatus(403)
                    }

                }
            })
    } else {
        // no bearerHeader provided
        res.sendStatus(403);
    }
}

module.exports = { login, verifyJwtToken, issueJwtToken }