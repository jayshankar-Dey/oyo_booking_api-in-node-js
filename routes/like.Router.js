const express = require('express');
const router = express.Router();
const singleUplode = require("../config/singleUplode");
const isauth = require("../middlewire/isauth.middlewire");
const isadmin = require('../middlewire/isadmin.middlewire');
const {
    likeController,
    unlikeController
} = require('../controllers/like.Controller');

router.put('/:id', isauth, likeController)
router.put('/unlike/:id', isauth, unlikeController)

module.exports = router