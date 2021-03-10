const { emailService, userService } = require('../service');
const { errorCodes } = require('../constants');
const { emailAction } = require('../constants');
const { successMessage } = require('../message');
const { passwordHasher } = require('../helper');

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
            const {
                name, password, email, prefLang = 'en'
            } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await emailService.sendEmail(email, emailAction.USER_REGISTERED, { userName: name });

            res.status(errorCodes.CREATED).json(successMessage.USER_CREATED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email, prefLang = 'en' } = req.body;

            await userService.deleteUser(userId);

            await emailService.sendEmail(email, emailAction.USER_DELETED, { userName: name });

            res.json(successMessage.USER_DELETED[prefLang]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};
