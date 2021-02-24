const userService = require('../service/user.service');
const errorCodes = require('../constants/errorCodes.enum');
const successMessages = require('../message/success.message')

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users)
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await userService.findUserById(userId)

            res.json(user)
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },

    createUser: async (req, res) => {
        try {
            const {name, email, prefLang = 'en'} = req.body;
            const user = {name, email}

            await userService.createUser(user, prefLang)

            res.status(errorCodes.CREATED).json(successMessages.USER_CREATED[prefLang])
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },
    
    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const {prefLang} = req.body;

            await userService.deleteUser(userId)

            res.json(successMessages.USER_DELETED[prefLang])
            
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}
