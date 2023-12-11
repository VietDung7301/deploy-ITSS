const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/job/:job_id', controller.test);
module.exports = router;