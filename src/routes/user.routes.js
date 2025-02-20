const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { createUser } = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

/**
 * POST /api/user
 * Register a new user.
 */
router.post('/', validate(createUser.body), userController.createUser);

module.exports = router;