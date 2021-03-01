const errorCodes = require('../constants/errorCodes.enum');
const errorMessages = require('../message/error.message');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const idLength = 24;
            const { carId } = req.params;
            const { prefLang = 'en' } = req.body;

            if (carId.length !== idLength) {
                throw new Error(errorMessages.NOT_VALID_ID[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { model, price, prefLang = 'en' } = req.body;

            if (!model || !price) {
                throw new Error(errorMessages.SOME_FIELDS_IS_EMPTY[prefLang]);
            }

            if (price <= 0) {
                throw new Error(errorMessages.INVALID_PRICE[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    }
};
