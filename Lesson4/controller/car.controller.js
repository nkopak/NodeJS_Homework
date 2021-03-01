const carService = require('../service/cars.service');
const errorCodes = require('../constants/errorCodes.enum');
const successMessages = require('../message/success.message');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars(req.query);

            res.json(cars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const { prefLang = 'en' } = req.body;
            await carService.createCar(req.body);

            res.status(errorCodes.CREATED)
                .json(successMessages.CAR_CREATED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { prefLang = 'en' } = req.body;

            await carService.deleteCar(carId);

            res.json(successMessages.CAR_DELETED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    }

};
