
const express = require('express');

const jobController = require('../controllers/jobController');

const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();



// @route   GET /jobs
// @desc    Get all jobs
// @access  Private
router.get('/', checkAuth, jobController.getAllJobs);
// router.get('/', jobController.getAllJobs);


// @route   POST /jobs
// @desc    Create new job
// @access  Private
router.post('/', checkAuth, jobController.multerMiddleware, jobController.createJob);


// @route   DELETE /jobs/:id
// @desc    Delete Job
// @access  Private
router.delete('/:id', checkAuth, jobController.deleteJob);


// @route   PATCH /jobs/:id
// @desc    Edit job
// @access  Private
router.patch('/:id', checkAuth, jobController.multerMiddleware, jobController.editJob);


// @route   GET /jobs/resume/view/:id
// @desc    Get resume (view online)
// @access  Public
router.get('/resume/view/:resumeURL', jobController.getResume);


// @route   GET /jobs/resume/download/:id
// @desc    Get resume (download)
// @access  Public
router.get('/resume/download/:resumeURL', jobController.downloadResume);


// @route   GET /jobs/coverLetter/view/:id
// @desc    Get coverLetter (view online)
// @access  Public
router.get('/coverLetter/view/:coverLetterURL', jobController.getCoverLetter);


// @route   GET /jobs/coverLetter/download/:id
// @desc    Get coverLetter (download)
// @access  Public
router.get('/coverLetter/download/:coverLetterURL', jobController.downloadCoverLetter);





module.exports = router;