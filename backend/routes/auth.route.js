import express from 'express'
import validate from 'express-validation';
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import paramValidation from '../config/param-validation';

const router = express.Router();

router.route('/login')

.get(authCtrl.verifyJWT,(req, res) => res.send(req.user_id))
.post(
    validate(paramValidation.login), 
    authCtrl.login, 
    authCtrl.issueJWT,
    userCtrl.createUserResponse
)

export default router;