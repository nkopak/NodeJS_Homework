const errorCodes = require('../constants/errorCodes.enum');
const errorMessages = require('../message/error.message');
const userService = require('../service/user.service');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const idLength = 24;
            const { userId } = req.params;
            const { prefLang = 'en' } = req.body;

            if (userId.length !== idLength) {
                throw new Error(errorMessages.NOT_VALID_ID[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {
                name, surname, email, prefLang = 'en'
            } = req.body;
            const found = email.includes('@');

            if (!name || !surname || !email) {
                throw new Error(errorMessages.SOME_FIELDS_IS_EMPTY[prefLang]);
            }

            if (!found) {
                throw new Error(errorMessages.INCORRECT_EMAIL[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserAlreadyExists: async (req, res, next) => {
        try {
            const { email, prefLang = 'en' } = req.body;

            const userExists = await userService.findUsers({ email });

            if (userExists.length) {
                // console.log(userExists.length);
                throw new Error((errorMessages.USER_IS_ALREADY_REGISTERED[prefLang]));
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
