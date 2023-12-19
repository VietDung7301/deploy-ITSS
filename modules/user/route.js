const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth } = require('../../middleware')

router.get('/user/cv', auth, controller.getUserCv);

module.exports = router;
