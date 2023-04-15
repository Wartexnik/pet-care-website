const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Service = require('./service');
const Pet = require('./pet');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    pet_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pet,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    comments: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'order',
    timestamps: false
});

Order.belongsTo(Service, { foreignKey: 'service_id' });
Order.belongsTo(Pet, { foreignKey: 'pet_id' });

module.exports = Order;
