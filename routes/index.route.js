import express from 'express';
import userRoutes from './user.route'
import httpStatus from 'http-status';
import appRoot from 'app-root-path';

const router = express.Router();

router.use('/users', userRoutes)

export default router;
