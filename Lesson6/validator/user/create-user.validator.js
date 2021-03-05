const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');

const girlsSubScheme = Joi.array().items(
    Joi.object({
        name: Joi.string().alphanum().max(20)
    })
);

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(50),
    surname: Joi.string().alphanum().min(2).max(50),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    car: Joi.boolean(),
    yearOfBorn: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    girls: girlsSubScheme.optional().when('car', { is: true, then: Joi.required() })
});
