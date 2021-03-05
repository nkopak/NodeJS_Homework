const { Schema, model } = require('mongoose');

const { dataBaseTables: { O_USER_AUTH, USER } } = require('../../constants');

const oUserAuthScheme = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_USER_AUTH, oUserAuthScheme);
