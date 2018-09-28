import express from 'express'
import userRoutes from './user.route'
import authRoutes from './auth.route'
import registerRoutes from './register.route'
import postRoutes from './post.route'

const router = express.Router()

router.use('/register', registerRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router;
