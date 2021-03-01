const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.checkIsIdValid, carController.getSingleCar);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.delete('/:carId', carMiddleware.checkIsIdValid, carController.deleteCar);

module.exports = router;
