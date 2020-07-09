const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController.js');

router.get('/weather', ApiController.weather)

module.exports = router;