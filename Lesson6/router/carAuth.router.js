const router = require('express').Router();
const Car = require('../dataBase/models/Car');
const { vinHasher } = require('../helper');

router.post('/', async (req, res) => {
    const { license_plate, VIN } = req.body;

    const car = await Car.findOne({ license_plate });

    if (!car) {
        throw new Error('No car found');
    }

    await vinHasher.compare(VIN, car.VIN);

    res.json('Ok');
});

module.exports = router;
