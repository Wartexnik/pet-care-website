const Pet = require('../models/pet');

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllPets
};