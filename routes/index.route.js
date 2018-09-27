import express from 'express';
import userRoutes from './user.route'
import loginRoutes from './login.route'
import registerRoutes from './register.route'

const router = express.Router();
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/users', userRoutes)

export default router;
