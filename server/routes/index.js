const express = require('express');
const router = express.Router();

const api = require('./api.js');
const room = require('./room.js');

router.use('/api', api);
router.use('/room', room);

module.exports = router;