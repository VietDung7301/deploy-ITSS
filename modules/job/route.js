const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/job/:job_id', controller.getJobById);
router.get('/job', controller.getJobList)
module.exports = router;
