const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/module.controller');

router.post('/', moduleController.calculateMarks);

module.exports = router;
