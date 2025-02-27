import express from 'express';
import authRouter from './routes/authRouter';

export const router = express.Router();

router.use('/auth', authRouter);
