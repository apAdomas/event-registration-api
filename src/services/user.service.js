const bcrypt = require('bcrypt')
const { User } = require('../models')

const SALT_ROUNDS = 10;

class UserService {

    /**
     * Create new user, hash password before storing
     * @param {Object} userData - Object containing {name, email, password}
     * @returns {Promise<User>} - created user instance
     */
    static async createUser(userData) {
        const existingUser = await User.findOne({where: {email: userData.email}});
        if (existingUser) {
            const error = new Error("User with this email already exists");
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });
        return user;
    }

    /**
     * Retrieves user by primary key
     * @param {string} userId - UUID of the user
     * @returns {Promise<User|null>}
     */
    static async getUser(userId) {
        return await User.findByPk(userId);
    }
}

module.exports = UserService;