const userAuth = require('../dataBase/models/O_userAuth');

module.exports = {
    createTokens: (tokens, userId) => userAuth.create({ ...tokens, userId }),

    findTokenAndDelete: (refreshToken) => userAuth.findOneAndDelete(refreshToken)
};
