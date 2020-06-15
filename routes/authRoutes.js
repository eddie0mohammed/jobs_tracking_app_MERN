
const express = require('express');

const authController = require('../controllers/authController');

const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();


// @route   GET /auth/users
// @desc    Get All Users
// @access  Private
router.get('/users', checkAuth, authController.getAllUsers);

// @route   POST /auth/register
// @desc    Create user
// @access  Public
router.post('/register', authController.register);

// @route   Get /auth/activateAccount
// @desc    Activate newly registered account (from email)
// @access  Public (token required from email)
router.get('/activateAccount/:token', authController.activateAccount);


// @route   POST /auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);


// @route   POST /auth/forgotPassword
// @desc    Request to reset password
// @access  Public
router.post('/forgotPassword', authController.forgotPassword);

// @route   GET /auth/resetPassword/:token
// @desc    Get request to this link will redirect to form to change password
// @access  Public
router.get('/resetPassword/:token', authController.redirectToResetPassword);


// @route   POST /auth/resetPassword/:token
// @desc    Reset password with new passwords
// @access  Public
router.post('/resetPassword/:token', authController.resetPassword);


// @path    Get /auth/user
// @desc    Get current user
// @access  Private
router.get('/user', checkAuth, authController.getUser);



// @path    POST /auth/resetMyPassword
// @desc    reset My Password
// @access  Private
router.post('/resetMyPassword', checkAuth, authController.resetMyPassword);



module.exports = router;