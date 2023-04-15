const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    slug: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    img_path: {
        type: DataTypes.STRING
    },
    description_short: {
        type: DataTypes.STRING
    },
    description_long: {
        type: DataTypes.STRING
    },
    base_price: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'service',
    timestamps: false
});

module.exports = Service;
