const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController.js');

router.get('/weather', ApiController.weather)

router.get('/holiday', ApiController.holiday)

module.exports = router;