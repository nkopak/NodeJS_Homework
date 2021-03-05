const { errorCodes } = require('../constants');
const { errorMessage } = require('../message');
const { userValidator } = require('../validator');
const { userService } = require('../service');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const idLength = 24;
            const { userId } = req.params;
            const { prefLang = 'en' } = req.body;

            if (userId.length !== idLength) {
                throw new Error(errorMessage.NOT_VALID_ID[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserAlreadyRegistered: async (req, res, next) => {
        try {
            const { email, prefLang = 'en' } = req.body;

            const userRegistered = await userService.findUsers({ email });

            if (userRegistered.length) {
                throw new Error(errorMessage.USER_IS_ALREADY_REGISTERED[prefLang]);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
