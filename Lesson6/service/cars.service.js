const Car = require('../dataBase/models/Car');
require('../dataBase/models/Car');

module.exports = {
    findCars: (filterObject) => Car.find(filterObject),

    findCarById: (carId) => Car.findById(carId),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (carId) => Car.findByIdAndDelete(carId)
};
