const jwt = require('jsonwebtoken');
const config = require('../config');


const maxAge = config.jwt.JWT_MAX_AGE || 365 * 24 * 60 * 60; //3 * 24 * 60 * 60;
const secret = config.jwt.JWT_SECRET


// create json web token
const createToken = (payload) => {
    return jwt.sign(payload, secret, {
        expiresIn: maxAge
    });
};

module.exports = {
    createToken,
}