const express = require('express');
const router = express.Router();
const { signup, verifyEmail, verifyPhone,addInterview } = require('../controller/authController');
const {jwtAuth} = require('../utils/jwtAuth');
// Route for signup
router.post('/signup', signup);

// Route for email verification
router.post('/verify-email', verifyEmail);

// Route for phone verification
router.post('/verify-phone', verifyPhone);


router.post('/create-interview',jwtAuth, addInterview);
module.exports = router;
