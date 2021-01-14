const { userService, tokenService, mailerService } = require('../services');
const passport = require('passport');
const config = require('../config');

module.exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        const token = tokenService.createToken({ id: user.id, email: user.email });

        const emailToken = tokenService.createToken({ id: user.id, email: user.email }, config.jwt.JWT_EMAIL_SECRET, '6h');

        const baseUrl = req.protocol + "://" + req.get("host");
        const url = baseUrl + `/api/auth/confirmation/${emailToken}`;

        mailerService.sendMail(user.email, 'Confirm Email', 'confirm-email', { url: url, name: user.firstName })

        res.status(201).send({ user, token });
        // res.status(201).send('ok');
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ messsage: error.message });
    }
}

module.exports.sendConfirmEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userService.getUserByOpts({ email });
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }

        const emailToken = tokenService.createToken({ id: user.id, email: user.email }, config.jwt.JWT_EMAIL_SECRET, '6h');

        const baseUrl = req.protocol + "://" + req.get("host");
        const url = baseUrl + `/api/auth/confirmation/${emailToken}`;

        mailerService.sendMail(email, 'Confirm Email', 'confirm-email', { url: url, name: '' });
        res.status(200).send({ message: 'success' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports.confirmEmail = async (req, res) => {
    try {
        const { id } = tokenService.verifyToken(req.params.token, config.jwt.JWT_EMAIL_SECRET);
        const user = await userService.updateUserById(id, { isConfirmed: true });
        res.status(200).send({ message: 'success' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports.sendResetPasswordEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userService.getUserByOpts({ email });
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }

        const emailToken = tokenService.createToken({ id: user.id, email: user.email }, config.jwt.JWT_EMAIL_SECRET, '1h');

        const baseUrl = req.protocol + "://" + req.get("host");
        const url = baseUrl + `/auth/password-reset/verify/${emailToken}`;

        mailerService.sendMail(email, 'Reset Password', 'forgot-password-email', { url: url, name: '' });
        res.status(200).send({ message: 'success' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { id } = tokenService.verifyToken(req.params.token, config.jwt.JWT_EMAIL_SECRET);
        const user = await userService.updateUserById(id, { password: password });
        res.status(200).send({ message: 'success' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports.loginWithEmailAndPassword = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error) { return res.status(500).send({ message: error.message }); }

        if (!user) {
            return res.status(500).send({ message: info.message })
        }
        const token = tokenService.createToken({ id: user.id, email: user.email });

        res.send({ user, token });

    })(req, res, next);
}

module.exports.loginWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
})

module.exports.loginWithFacebook = passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
})

module.exports.authThirdPartyCallback = (req, res) => {
    const token = tokenService.createToken({ id: req.user.id, email: req.user.email });
    res.send({ user: req.user, token });
}

module.exports.logout = async (req, res) => {
    req.logout();
    res.status(200).send({ message: 'logout successful' });
}