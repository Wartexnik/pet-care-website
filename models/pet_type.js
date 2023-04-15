const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PetType = sequelize.define('PetType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    price_mod: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'pet_type',
    timestamps: false
});

module.exports = PetType;
