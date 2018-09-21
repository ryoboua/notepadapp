import express from 'express';
import httpStatus from 'http-status';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(process.env.SECURE_MESSAGE);
});

export default router;
