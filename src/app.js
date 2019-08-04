const express = require('express');
const cors = require('cors');

/** Express App */
const app = express();

/** Middlewares */
const errorHandler = require('./middlewares/error-handler');

/** controllers */
const HealthCheckController = require('./controllers/HealthCheck');
const UsersTypesController = require('./controllers/UsersTypes');
const UsersController = require('./controllers/Users');

app.use(express.json());
app.use(cors());
app.use(new HealthCheckController(express.Router()).router);
app.use(new UsersTypesController(express.Router()).router);
app.use(new UsersController(express.Router()).router);
app.use(errorHandler());

module.exports = app;
