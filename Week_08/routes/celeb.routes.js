const express = require('express');
const celebController = require('../controllers/celeb.controller');

const celebRouter = express.Router();

celebRouter.get('/:name', celebController.searchCelebrity);

module.exports = celebRouter;
