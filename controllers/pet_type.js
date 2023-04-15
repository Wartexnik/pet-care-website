const PetType = require('../models/pet_type');

const getAllPetTypes = async (req, res) => {
    try {
        const petTypes = await PetType.findAll();
        res.json(petTypes);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllPetTypes
};