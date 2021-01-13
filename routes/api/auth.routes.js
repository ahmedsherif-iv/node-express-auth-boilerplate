const { Router } = require('express');
const { authController } = require('../../controllers');
const passport = require('passport');
const { celebrate } = require('celebrate');
const { opts, userValidation } = require('../../validations');

const router = Router();

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', celebrate(userValidation.loginSchema, opts), authController.loginWithEmailandPassword);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', celebrate(userValidation.registerSchema, opts), authController.registerUser);


// @route GET api/auth/logout
// @desc Logout user
// @access Public
router.get('/logout', authController.logout);

// @route GET api/auth/google
// @desc Login with google
// @access Public
router.get('/google', authController.loginWithGoogle);

// @route GET api/auth/google/callback
// @desc Callback route for google to redirect to
// @access Public
router.get('/google/callback', passport.authenticate('google'), authController.googleCallback);

module.exports = router;