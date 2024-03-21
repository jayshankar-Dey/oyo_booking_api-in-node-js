const express = require('express');
const router = express.Router();
const singleUplode = require("../config/singleUplode");
const isauth = require("../middlewire/isauth.middlewire");
const isadmin = require('../middlewire/isadmin.middlewire');
const {
    create_Oyo_Controllor,
    update_Oyo_Controllor,
    update_oyo_image_controller,
    Update_oyo_facilities,
    delete_Oyo_image_controller,
    Delete_oyo_facilities,
    get_all_oyo_controller,
    get_single_oyo_controller
} = require('../controllers/oyo.Controller');


router.post('/create', isauth, isadmin, create_Oyo_Controllor)
router.post('/update/:id', isauth, isadmin, update_Oyo_Controllor)

router.put('/update/image/:id', isauth, isadmin, singleUplode, update_oyo_image_controller)

router.put('/update/facilites/:id', isauth, isadmin, Update_oyo_facilities)

router.delete('/delete/image/:id', isauth, isadmin, delete_Oyo_image_controller)

router.delete('/delete/facilites/:id', isauth, isadmin, Delete_oyo_facilities)

router.get('/getall', isauth, isadmin, get_all_oyo_controller)

router.get('/get/:id', isauth, isadmin, get_single_oyo_controller)
module.exports = router;