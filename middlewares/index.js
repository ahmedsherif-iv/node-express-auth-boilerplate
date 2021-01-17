const validationMiddleware = require('./validation.middleware');
const authMiddleWare = require('./auth.middleware');
const rateLimiter = require('./rateLimiter.middleware');

module.exports = {
    validationMiddleware,
    authMiddleWare,
    rateLimiter,
}