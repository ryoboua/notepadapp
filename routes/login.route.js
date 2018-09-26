import express from 'express'
import auth from '../controllers/auth.controller'
const router = express.Router();


router.route('/')
.get((req, res) => {
    res.json({
        message: 'You made a get request'
    })
})
.post(auth.login, (req, res) => {
    if (req.err){
        const { status, message } = req.err
        res.status(status).send(message)
    }
    if(req.user) {
        res.send(req.user)
    }
})

export default router;
