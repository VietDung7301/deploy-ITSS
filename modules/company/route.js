const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth } = require('../../middleware')

router.get('/company/:company_id', auth, controller.getCompanyInformation);

module.exports = router;
