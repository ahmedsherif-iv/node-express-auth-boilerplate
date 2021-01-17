const { Router } = require('express');
const { userController } = require('../controllers');
const { celebrate } = require('celebrate');
const { opts, userValidation } = require('../validations');
const { authMiddleWare } = require('../middlewares');
const { requireAuth, isAdmin } = authMiddleWare;

const router = Router();

router.route('/')
    .get([requireAuth, isAdmin], userController.getUsers)
    .post([
        requireAuth,
        isAdmin,
        celebrate(userValidation.registerSchema, opts)
    ], userController.createUser);

router.route('/:id')
    .get([requireAuth, isAdmin], userController.getUserById)
    .delete([requireAuth, isAdmin], userController.deleteUser)
    .put([
        requireAuth,
        isAdmin,
        celebrate(userValidation.updateSchema, opts)
    ], userController.updateUser);


router.route('/profile')
    .get(requireAuth, userController.getUserProfile)
    .put([
        requireAuth,
        celebrate(userValidation.updateSchema, opts),
    ], userController.updateUserProfile);


router.route('/get-activation-email')
    .get(celebrate(userValidation.sendRequestEmailSchema, opts), userController.sendConfirmEmail);

router.route('/confirmation/:token')
    .get(userController.confirmEmail);

module.exports = router;