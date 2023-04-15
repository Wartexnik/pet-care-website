const express = require('express');
const serviceController = require('./../controllers/service');

const router = express.Router();

router
    .route('/')
    .get(serviceController.getAllServices)

module.exports = router;