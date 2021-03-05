const carService = require('../service/cars.service');
const { errorCodes } = require('../constants');
const { successMessage } = require('../message');
const { vinHasher } = require('../helper');

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
            const { VIN, prefLang = 'en' } = req.body;

            const hashVIN = await vinHasher.hash(VIN);

            await carService.createCar({ ...req.body, VIN: hashVIN });

            res.status(errorCodes.CREATED)
                .json(successMessage.CAR_CREATED[prefLang]);
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

            res.json(successMessage.CAR_DELETED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST)
                .json(e.message);
        }
    }

};
