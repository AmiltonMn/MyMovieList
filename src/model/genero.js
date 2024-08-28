const Sequelize = require('sequelize');
const database = require('../config/db');

const genero = database.define('genero', {
    IDGenero: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

module.exports = genero;