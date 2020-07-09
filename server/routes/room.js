const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController.js');

router.get('/', roomController.getRoomRootHandler);
router.post('/add', roomController.postRoomAddHandler);

router.get('/update/:id', roomController.getRoomUpdateHandler);

// update room type
router.put('/update/:id', roomController.putRoomUpdateHandler);

// soft delete - update room status
router.put('/delete/:id', roomController.putRoomDeleteHandler);

// booking - update room status (customer view)
router.put('/booking/:id', roomController.putRoomBookingHandler);

module.exports = router;