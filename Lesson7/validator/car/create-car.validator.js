const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    brand: Joi.string().min(1).max(30).required(),
    model: Joi.string(),
    price: Joi.number().integer(),
    license_plate: Joi.string().regex(regexpEnum.REGISTRATION_PLATES_REGEXP).required(),
    VIN: Joi.string().alphanum().max(10).required()
});
