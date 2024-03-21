const express = require('express');
const singleUplode = require("../config/singleUplode");
const {
    UpdateProfile_Pic_Controller,
    Update_user_controller,
    change_password_controller
} = require("../controllers/user.Controller");
const isauth = require("../middlewire/isauth.middlewire");
const isadmin = require('../middlewire/isadmin.middlewire');
const router = express.Router();


router.post('/profile', isauth, singleUplode, UpdateProfile_Pic_Controller)
router.post('/Update', isauth, Update_user_controller);
router.post('/changePassword', isauth, change_password_controller)
    ///
module.exports = router