import express from 'express'
import validate from 'express-validation';
import authCtrl from '../controllers/auth.controller'
import paramValidation from '../config/param-validation';

const router = express.Router();

router.route('/')
.get(authCtrl.verifyJwtToken)

.post(validate(paramValidation.login), authCtrl.login, authCtrl.issueJwtToken)

export default router;