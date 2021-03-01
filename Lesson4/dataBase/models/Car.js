const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    model: { type: String, required: true },
    price: { type: Number, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('Car', carScheme);
