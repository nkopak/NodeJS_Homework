const { errorCodes } = require('../constants');
const { errorMessage } = require('../message');
const { carValidator } = require('../validator');
const { carService } = require('../service');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const idLength = 24;
            const { carId } = req.params;
            const { prefLang = 'en' } = req.body;

            if (carId.length !== idLength) {
                throw new Error(errorMessage.NOT_VALID_ID[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    isCarAlreadyExists: async (req, res, next) => {
        try {
            const { license_plate, prefLang = 'en' } = req.body;

            const license = await carService.findCars({ license_plate });

            if (license.length) {
                throw new Error(errorMessage.CAR_IS_ALREADY_REGISTERED[prefLang]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
