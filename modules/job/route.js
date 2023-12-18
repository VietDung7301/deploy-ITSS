const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth } = require('../../middleware/auth')

router.get('/job/:job_id', auth, controller.getJobById);
router.get('/job', auth, controller.getJobList)
module.exports = router;
