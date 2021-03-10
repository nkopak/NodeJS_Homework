const { Schema, model } = require('mongoose');

const { dataBaseTables: { CAR } } = require('../../constants');

const carScheme = new Schema({
    brand: { type: String, required: true },
    model: { type: String, default: 'some model' },
    price: { type: Number, default: 100 },
    license_plate: { type: String, required: true },
    VIN: { type: String, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carScheme);
