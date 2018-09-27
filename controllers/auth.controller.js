import jwt from 'jsonwebtoken'
import config from '../config/config'
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

function issueJwtToken(req, res, next) {
    if (req.err){
        const { status, message } = req.err
        res.status(status).send(message)
    }
    if(req.user) {
        jwt.sign({ user: req.user }, config.jwtSecret, { expiresIn: '1h' },
         (err, token) => {
            if (err) console.log(err)
            res.json({
                token
            })
            //TODO Setup so frontend can catch and save jwtToken on local storage
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
                    console.log(err)
                    res.sendStatus(403)
                } else {
                    res.json({
                        message: 'You made a get request',
                        authData
                    })
                }
            })
            next()
    } else {
        //console.log(err)
        res.sendStatus(403);
    }
}

export default { login, verifyJwtToken, issueJwtToken }