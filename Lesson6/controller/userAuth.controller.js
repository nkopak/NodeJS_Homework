const User = require('../dataBase/models/User');
const { passwordHasher, tokenizer } = require('../helper');
const { userAuthService } = require('../service');
const { errorCodes } = require('../constants');

module.exports = {
    userAuth: async (req, res) => {
        try {
            const { email, password, userId } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No user found');
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await userAuthService.createTokens(tokens, userId);

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req.body;

            await userAuthService.findTokenAndDelete(refreshToken);

            const newTokens = tokenizer();

            await userAuthService.createTokens(newTokens, refreshToken);

            res.json(newTokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
