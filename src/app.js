const express = require('express');
const routes = require('../src/routes/index.js');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).send({error: 'Not Found'});
});

module.exports = app;