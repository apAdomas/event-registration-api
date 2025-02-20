const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {createRegistration} = require('../validations/registration.validation')
const registrationController = require('../controllers/registration.controller');

router.post('/', validate(createRegistration.body), registrationController.createRegistration);

module.exports = router;