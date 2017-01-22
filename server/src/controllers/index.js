import express from 'express';
import bear from './bear';

const router = express.Router();

// sub-stack routes below
[
  bear,
].reduce((router, subStack) => router.use('/api', subStack), router);

router.use('/ping', (req, res) => {
  res.json('pong');
});

export default router;
