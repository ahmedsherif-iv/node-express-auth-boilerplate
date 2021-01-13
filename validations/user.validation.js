const { Joi, Segments } = require('celebrate');

const loginSchema = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string(),
    }),
}

const registerSchema = {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        picture: Joi.string(),
        // role: Joi.string().default('admin')
    }),
    [Segments.QUERY]: Joi.object().keys({ id: Joi.string().required() }),
}

module.exports = {
    loginSchema,
    registerSchema,
}