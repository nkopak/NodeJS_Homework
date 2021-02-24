const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const pathDB = path.join(process.cwd(), 'dataBase', 'users.json');
const readFilePromisify = promisify(fs.readFile);
const writeFilePromisify = promisify(fs.writeFile);

module.exports = {
    findUsers: async () => {
        const usersFile = await readFilePromisify(pathDB);
        const users = JSON.parse(usersFile.toString())

        return users;
    },

    findUserById: async (userId) => {
        const usersFile = await readFilePromisify(pathDB);
        const user = JSON.parse(usersFile.toString())[userId]

        return user
    },

    createUser: async (userObject) => {
        const usersFile = await readFilePromisify(pathDB);
        const users = JSON.parse(usersFile.toString());

        users.push(userObject);

        await writeFilePromisify(pathDB, JSON.stringify(users))

    },

    deleteUser: async(userId) => {
        const usersFile = await readFilePromisify(pathDB);
        const users = JSON.parse(usersFile.toString())

        users.splice(userId,1)
        await writeFilePromisify(pathDB, JSON.stringify(users))
    }
}
