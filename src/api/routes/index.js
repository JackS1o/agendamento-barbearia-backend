import express from 'express';
import { authMiddleware } from '../middlewares/tokenValidation.js';
import usersRouter from './users/index.js';
import healthRouter from './health/index.js';
import loginRouter from './login/index.js';

const router = express.Router();

router.use('/users', authMiddleware, usersRouter);

router.use('/health', healthRouter);

router.use('/login', loginRouter);

export default router;
