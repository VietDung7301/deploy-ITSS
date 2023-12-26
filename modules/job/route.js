const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, uploadFile } = require('../../middleware');

router.get('/job/:job_id', auth, controller.getJobById);
router.get('/job', auth, controller.getJobList);
router.post('/job/:job_id/upload_cv', auth, uploadFile([{name: 'file', path: '/user/cv'}], 'single'), controller.applyJob);
router.get('/job/:job_id/is_applied', auth, controller.checkApplied);

module.exports = router;
