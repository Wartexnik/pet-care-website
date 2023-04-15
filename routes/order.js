const express = require('express');
const orderController = require('./../controllers/order');

const router = express.Router();

router
    .route('/')
    .get(orderController.getAllOrders)

module.exports = router;