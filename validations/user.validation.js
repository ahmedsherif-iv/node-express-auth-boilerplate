const { Joi, Segments } = require('celebrate');

const loginSchema = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string(),
    }),
}

//To check a password between 8 to 15 characters 
// which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
// (?=.*[!@#$&*])
const registerSchema = {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/),
        picture: Joi.string(),
        // role: Joi.string().default('admin')
    }),
}

module.exports = {
    loginSchema,
    registerSchema,
}