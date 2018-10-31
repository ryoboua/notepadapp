import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/')
.get((req, res) => res.json({ message: 'Welcome to the registration route' }))
.post(  
    validate(paramValidation.createUser),
    userCtrl.createUser, 
    authCtrl.issueJWT,
    userCtrl.createUserResponse
    )
router.route('/demouser')
.post(
    validate(paramValidation.createDemoUser),
    userCtrl.createDemoUser,
    authCtrl.issueJWT,
    userCtrl.createUserResponse
)

export default router;