const { Schema, model } = require('mongoose');

const { dataBaseTables: { USER } } = require('../../constants');

const userScheme = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    age: { type: Number, default: 15 },
    cars: [{ type: Schema.Types.Mixed }]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full-name').get(function() {
    return `${this.name} ${this.surname}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

userScheme.pre('find', function() {
    console.log('pre find hook');
    this.populate('userCars');
})
    .pre('findOne', function() {
        console.log('pre find one hook');
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
