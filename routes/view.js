const express = require('express');
const viewController = require('./../controllers/view');
const authController = require('./../controllers/auth');
const serviceController = require('./../controllers/service');
const orderController = require('./../controllers/order');
const userController = require('./../controllers/user');

const router = express.Router();

router
    .route('/')
    .get(viewController.getIndex)

router
    .route('/about')
    .get(viewController.getAbout)

router
    .route('/signup')
    .post(authController.signup)

router
    .route('/login')
    .post(authController.login)

router
    .route('/logout')
    .get(authController.logout)

router
    .route('/services/:slug')
    .get(viewController.getService)

router
    .route('/order')
    .get(viewController.getOrderForm)
    .post(orderController.createOrder)

router
    .route('/my-orders')
    .get(viewController.getMyOrders)

router
    .route('/payment-completed')
    .post(express.raw({ type: "application/json" }), orderController.confirmOrder)

router
    .route('/profile')
    .get(viewController.getProfile)
    .patch(userController.updateProfile)

module.exports = router;