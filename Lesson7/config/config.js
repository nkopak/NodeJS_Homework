module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/sep-2020',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'asdf@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '1234',
};
