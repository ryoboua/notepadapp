var express = require('express');
var router = express.Router();

/* GET users by id. */

router.route('/:id').get((req, res ) => res.send('hello'))
module.exports = router;
