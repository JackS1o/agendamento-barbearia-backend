import express from 'express';
import { createUserController } from '../../users/controllers/index.js';

const router = express.Router();

router.post('/', createUserController);

export default router;
