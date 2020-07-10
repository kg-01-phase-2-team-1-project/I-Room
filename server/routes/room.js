const express = require('express');
const router = express.Router();

const RoomController = require('../controllers/RoomController.js');
const { auth, isAdmin, isCustomer } = require('../middlewares/auth')

router.get('/', RoomController.getRoomRootHandler);
// router.get('/', auth, isAdmin, RoomController.getRoomRootHandler);

router.post('/add', auth, isAdmin, RoomController.postRoomAddHandler);

router.get('/update/:id', auth, isAdmin, RoomController.getRoomUpdateHandler);

// update room type
router.put('/update/:id', auth, isAdmin, RoomController.putRoomUpdateHandler);

// soft delete - update room status
router.put('/delete/:id', auth, isAdmin, RoomController.putRoomDeleteHandler);


// router.get('/booking', auth, isCustomer, RoomController.getRoomBookingHandler);
// booking - update room status (customer view)
router.put('/booking/:id', auth, RoomController.putRoomBookingHandler);

module.exports = router;