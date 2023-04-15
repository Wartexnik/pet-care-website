const express = require('express');
const petTypeController = require('./../controllers/pet_type');

const router = express.Router();

router
    .route('/')
    .get(petTypeController.getAllPetTypes)

module.exports = router;