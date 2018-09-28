import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import User from '../models/user.model'

const router = express.Router();

router.route('/')
.get((req, res) => res.json({ message: 'Welcome to the registration route' }))
.post(  
        validate(paramValidation.createUser),
        userCtrl.createUser, 
        authCtrl.issueJwtToken,
        userCtrl.createUserResponse
    )

export default router;
