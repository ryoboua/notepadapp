import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router();

/* GET users by id. */

router.route('/:user_id')
.get( authCtrl.verifyJwtToken, authCtrl.checkUserParams, (req, res ) => res.send(req.user_id))
.post(authCtrl.verifyJwtToken, validate(paramValidation.updateUser), userCtrl.updateUser,
    (req, res) => {
        if (req.err){
            const { status, message } = req.err
            res.status(status).send(message)
        }
    }
)

router.route('/:user_id/notes/:note_id')
.post(
    //if note_id present update note, if not create one
    authCtrl.verifyJwtToken,
    authCtrl.checkUserParams,
)

export default router;