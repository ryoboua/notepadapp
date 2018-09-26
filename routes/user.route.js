import express from 'express'
const router = express.Router();

/* GET users by id. */

router.route('/:id').get((req, res ) => res.send('hello'))
export default router;
