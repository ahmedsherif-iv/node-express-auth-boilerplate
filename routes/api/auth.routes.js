const { Router } = require('express');
const { authController } = require('../../controllers');
const passport = require('passport');
const { celebrate } = require('celebrate');
const { opts, userValidation } = require('../../validations');
const { userService } = require('../../services');

const router = Router();

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', celebrate(userValidation.loginSchema, opts), authController.loginWithEmailAndPassword);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', celebrate(userValidation.registerSchema, opts), authController.registerUser);

// @route GET api/auth/confirmation/get-activation-email
// @desc Resend confirmation email
// @access Public
router.get('/get-activation-email', celebrate(userValidation.sendRequestEmailSchema, opts), authController.sendConfirmEmail);

// @route GET api/auth/confirmation/:token
// @desc Confirm user's email
// @access Public
router.get('/confirmation/:token', authController.confirmEmail);

// @route POST api/auth/password-reset/get-code
// @desc Reset password of user
// @access Public
router.post('/password-reset/get-code', celebrate(userValidation.sendRequestEmailSchema, opts), authController.sendResetPasswordEmail);

// @route POST api/auth/password-reset/verify
// @desc Verify and save new password of user
// @access Public
router.post('/password-reset/verify/:token', celebrate(userValidation.resetPasswordSchema, opts), authController.resetPassword);

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
router.get('/google/callback', passport.authenticate('google'), authController.authThirdPartyCallback);

// @route GET api/auth/facebook
// @desc Login with facebook
// @access Public
router.get('/facebook', authController.loginWithFacebook);

// @route GET api/auth/facebook/callback
// @desc Callback route for facebook to redirect to
// @access Public
router.get('/facebook/callback', passport.authenticate('facebook'), authController.authThirdPartyCallback);

module.exports = router;