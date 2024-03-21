const express = require('express');
const {
    registerController,
    loginController,
    reset_password_by_sending_email,
    resetPassword_Controller
} = require('../controllers/auth.Controller');
const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/reset/email', reset_password_by_sending_email)

router.post('/reset/password/:id/:token', resetPassword_Controller)

module.exports = router;