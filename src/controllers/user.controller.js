const UserService = require('../services/user.service');

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