import express from 'express'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router();

/* GET users by id. */
router.route('/:user_id')
.all(authCtrl.verifyJwtToken)
.get( 
    (req, res ) => res.json({ user_id: req.user_id }))
.post(
    validate(paramValidation.updateUser), 
    userCtrl.updateUser,
    authCtrl.issueJwtToken,
    userCtrl.createUserResponse
)

router.route('/:user_id/notes')
.all(authCtrl.verifyJwtToken)
.post(
    validate(paramValidation.createNote),
    userCtrl.createNote
)

router.route('/:user_id/notes/:note_id')
.all(authCtrl.verifyJwtToken)
.post(
    validate(paramValidation.updateNote),
    userCtrl.updateNote
)
.put(
    validate(paramValidation.updateNote),
    userCtrl.updateNote
)
.delete(
    userCtrl.deleteNote
)

export default router;