const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findOneAndDelete(userId)
};
