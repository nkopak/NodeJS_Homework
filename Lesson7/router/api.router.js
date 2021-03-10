const router = require('express').Router();

const userRouter = require('./user.router');
const carRouter = require('./cars.router');
const userAuthRouter = require('./userAuth.router');
const carAuthRouter = require('./carAuth.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);
router.use('/userAuth', userAuthRouter);
router.use('/carAuth', carAuthRouter);

module.exports = router;
