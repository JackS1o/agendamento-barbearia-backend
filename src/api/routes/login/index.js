import express from 'express';
import { loginController } from '../../login/controllers/index.js';

const router = express.Router();

router.post('/', loginController);

export default router;
