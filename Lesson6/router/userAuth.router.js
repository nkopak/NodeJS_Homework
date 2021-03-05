const router = require('express').Router();

const { userAuthController } = require('../controller');
const { userAuthMiddleware } = require('../middleware');

router.post('/', userAuthMiddleware.checkAccessTokenMiddleware, userAuthController.userAuth);

router.delete('/', userAuthController.refreshToken);

module.exports = router;
