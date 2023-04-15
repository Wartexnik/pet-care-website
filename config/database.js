const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DATABASE_TYPE}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`)

module.exports = sequelize;