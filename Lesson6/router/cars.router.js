const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.checkIsIdValid, carController.getSingleCar);

router.post('/', carMiddleware.isCarValid, carMiddleware.isCarAlreadyExists, carController.createCar);

router.delete('/:carId', carMiddleware.checkIsIdValid, carController.deleteCar);

module.exports = router;
