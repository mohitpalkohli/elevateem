const express = require('express');
const router = express.Router();
const connectorController = require('../controllers/connector.controller');

router.get('/doc', connectorController.getGoogleDoc);

module.exports = router; 