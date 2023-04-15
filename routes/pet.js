const express = require('express');
const petController = require('./../controllers/pet');

const router = express.Router();

router
    .route('/')
    .get(petController.getAllPets)

module.exports = router;