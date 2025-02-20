const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const eventRoutes = require('./event.routes');
const registrationRoutes = require('./registration.router')

router.use('/user', userRoutes);
router.use('/events', eventRoutes);
router.use('/registrations', registrationRoutes);

module.exports = router;