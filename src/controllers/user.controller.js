const UserService = require('../services/user.service');

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 * @param   {Object} req - Express request object containing user details (name, email, password) in the body
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next function to handle errors
 */
exports.createUser = async (req, res, next) => {
    try {
        await UserService.createUser(req.body);
        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        next(error);
    }
};