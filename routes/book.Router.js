const express = require('express');
const router = express.Router();
const singleUplode = require("../config/singleUplode");
const isauth = require("../middlewire/isauth.middlewire");
const isadmin = require('../middlewire/isadmin.middlewire');
const { oyo_book_controller, get_Single_Book_Controller } = require('../controllers/Book.Controller');

router.post('/book', isauth, isadmin, oyo_book_controller)
router.get('/book/get/:id', isauth, isadmin, get_Single_Book_Controller)

module.exports = router