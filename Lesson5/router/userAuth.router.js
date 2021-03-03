const router = require('express').Router();
const User = require('../dataBase/models/User');
const { passwordHasher } = require('../helper');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('No user found');
    }

    await passwordHasher.compare(password, user.password);

    res.json('OK');
});

module.exports = router;
