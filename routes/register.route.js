import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import userCtrl from '../controllers/user.controller'
import User from '../models/user.model'

const router = express.Router();

const createUserResponse = (req, res) => {
    if (req.err){
        const { status, message } = req.err
        res.status(status).send(message)
    }
    if(req.user) {
        req.user.password = undefined
        res.send(req.user)
        //TODO: redirect
    }
}

router.route('/')
.get((req, res) => res.json({ message: 'Welcome to the registration route' }))
.post(validate(paramValidation.createUser), userCtrl.createUser, createUserResponse)

export default router;
