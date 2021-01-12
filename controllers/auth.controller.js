const { userService, tokenService } = require('../services');
const passport = require('passport');

module.exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        const token = tokenService.createToken({ id: user.id, email: user.email });
        res.status(201).send({ status: 'success', token });
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ msg: error.message });
    }
}

module.exports.loginWithEmailandPassword = (req, res, next) => {
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
    scope: ['profile'],
})

module.exports.googleCallback = (req, res) => {
    const token = tokenService.createToken({ id: req.user.id, email: req.user.email });
    res.send({ user: req.user, token });
}

module.exports.logout = async (req, res) => {
    req.logout();
    res.status(200).send({ message: 'logout successful' });
}