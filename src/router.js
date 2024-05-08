import express from 'express';

export const router = express.Router();

router.use('/salute', (req, res) => {
  res.send('Hello world!');
});
