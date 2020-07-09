const express = require('express');
const router = express.Router();

const RoomController = require('../controllers/RoomController.js');

router.get('/', RoomController.getRoomRootHandler);
router.post('/add', RoomController.postRoomAddHandler);

router.get('/update/:id', RoomController.getRoomUpdateHandler);

// update room type
router.put('/update/:id', RoomController.putRoomUpdateHandler);

// soft delete - update room status
router.put('/delete/:id', RoomController.putRoomDeleteHandler);

// booking - update room status (customer view)
router.put('/booking/:id', RoomController.putRoomBookingHandler);

module.exports = router;