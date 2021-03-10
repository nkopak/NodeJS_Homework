const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getSingleUser);

router.post('/', userMiddleware.isUserValid, userMiddleware.isUserAlreadyRegistered, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
