const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {createEvent, getEvents} = require('../validations/event.validation');
const eventController = require('../controllers/event.controller');


router.get('/', eventController.getEvents);

router.post('/', validate(createEvent.body), eventController.createEvent);

module.exports = router;