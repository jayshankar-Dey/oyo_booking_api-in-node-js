const express = require('express');
const router = express.Router();
const singleUplode = require("../config/singleUplode");
const isauth = require("../middlewire/isauth.middlewire");
const isadmin = require('../middlewire/isadmin.middlewire');
const {
    create_room_controller,
    update_room_image_controller,
    update_room_controller,
    delete_room_controller,
    get_single_room_controller,

} = require('../controllers/room.Controller');

router.put('/create/:id', isauth, isadmin, create_room_controller)
router.put('/update/image/:id', isauth, isadmin, singleUplode, update_room_image_controller)

router.put('/update/:id', isauth, isadmin, update_room_controller)
router.delete('/delete/:id', isauth, isadmin, delete_room_controller)

router.get('/get/:id', isauth, isadmin, get_single_room_controller)


//
module.exports = router;