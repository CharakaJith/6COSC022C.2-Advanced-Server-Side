const express = require('express');
const dateController = require('../controllers/date.controller');

const dateRouter = express.Router();

dateRouter.post('/', dateController.calculateAge);

module.exports = dateRouter;
