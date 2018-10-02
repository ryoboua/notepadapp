import express from 'express'
import userRoutes from './user.route'
import authRoutes from './auth.route'
import registerRoutes from './register.route'

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

router.use('/register', registerRoutes)
router.use('/auth', authRoutes)

//Protected route
router.use('/users', userRoutes)

export default router;