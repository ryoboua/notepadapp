import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router();

/* GET users by id. */

router.route('/:userId')
.get( authCtrl.verifyJwtToken, authCtrl.checkUserParams, (req, res ) => res.send(req.user))
.post(authCtrl.verifyJwtToken, validate(paramValidation.updateUser), userCtrl.updateUser,
    (req, res) => {
        if (req.err){
            const { status, message } = req.err
            res.status(status).send(message)
        }
    }
)

export default router;