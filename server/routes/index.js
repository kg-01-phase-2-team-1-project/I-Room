const express = require('express');
const router = express.Router();

const api = require('./api.js');
const room = require('./room.js');
const userRouter = require('./user-router')

router.use('/api', api);
router.use('/room', room);
router.use('/user', userRouter)

module.exports = router;