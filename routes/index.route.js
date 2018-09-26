import express from 'express';
import userRoutes from './user.route'
import loginRoutes from './login.route'

const router = express.Router();
router.use('/login', loginRoutes)
router.use('/users', userRoutes)

export default router;
