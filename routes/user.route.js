import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router();

/* GET users by id. */

router.route('/:user_id')
.get( authCtrl.verifyJwtToken, (req, res ) => res.json({ user_id: req.user_id }))
.post(
    authCtrl.verifyJwtToken,
    validate(paramValidation.updateUser), 
    userCtrl.updateUser,
    authCtrl.issueJwtToken,
    userCtrl.createUserResponse
)

router.route('/:user_id/notes')
.post(
    //if note_id present update note, if not create one
    authCtrl.verifyJwtToken,
    validate(paramValidation.createNote),
    userCtrl.createNote
)

router.route('/:user_id/notes/:note_id')
.post(
    //if note_id present update note, if not create one
    authCtrl.verifyJwtToken,
    validate(paramValidation.createNote),
    userCtrl.updateNote
)

export default router;