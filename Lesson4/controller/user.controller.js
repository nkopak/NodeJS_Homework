const userService = require('../service/user.service');
const errorCodes = require('../constants/errorCodes.enum');
const successMessages = require('../message/success.message');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getUserByQuery: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { prefLang = 'en' } = req.body;

            await userService.createUser(req.body);

            res.status(errorCodes.CREATED).json(successMessages.USER_CREATED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { prefLang = 'en' } = req.body;

            await userService.deleteUser(userId);

            res.json(successMessages.USER_DELETED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
