const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).send({error: 'Not Found'});
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 400).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;