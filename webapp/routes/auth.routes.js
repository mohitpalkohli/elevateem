const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/google', authController.getAuthUrl);
router.get('/google/callback', authController.handleCallback);

module.exports = router; 