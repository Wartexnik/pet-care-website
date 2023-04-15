const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const PetType = require('./pet_type');

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    pet_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PetType,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
}, {
    tableName: 'pet',
    timestamps: false
});

Pet.belongsTo(PetType, { foreignKey: 'pet_type_id' });
Pet.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Pet;
