const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {createRegistration} = require('../validations/registration.validation')
const registrationController = require('../controllers/registration.controller');

/**
 * POST /api/registrations
 * Register a user for an event.
 */
router.post('/', validate(createRegistration.body), registrationController.createRegistration);

module.exports = router;