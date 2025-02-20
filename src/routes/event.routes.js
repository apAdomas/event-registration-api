const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {createEvent, getEvents} = require('../validations/event.validation');
const eventController = require('../controllers/event.controller');

/**
 * GET /api/events
 * Retrieve all upcoming events.
 */
router.get('/', eventController.getEvents);

/**
 * POST /api/events
 * Create a new event.
 */
router.post('/', validate(createEvent.body), eventController.createEvent);

module.exports = router;