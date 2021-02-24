const errorCodes = require('../constants/errorCodes.enum');
const errorMessages = require('../message/error.message');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const {prefLang} = req.body;
            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.NOT_VALID_ID[prefLang])
            }

            next();

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {name, email, prefLang = 'en'} = req.body;
            if (!name || !email) {
                throw new Error(errorMessages.SOME_FIELDS_IS_EMPTY[prefLang]);
            }

            const regex = /@/g;
            let found = email.match(regex);
            if (!found) {
                throw new Error(errorMessages.INCORRECT_EMAIL[prefLang]);
            }

            next();

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}
