import express from 'express'
import validate from 'express-validation';
import auth from '../controllers/auth.controller'
import paramValidation from '../config/param-validation';

const router = express.Router();


router.route('/')
.get((req, res) => {
    res.json({
        message: 'You made a get request'
    })
})
.post(validate(paramValidation.login), auth.login, (req, res) => {
    if (req.err){
        const { status, message } = req.err
        res.status(status).send(message)
    }
    if(req.user) {
        res.send(req.user)
        //TODO - add JWT token
    }
})

export default router;