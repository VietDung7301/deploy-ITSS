const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth } = require('../../middleware')

router.get('/notification', auth, controller.getNotification);

module.exports = router;
