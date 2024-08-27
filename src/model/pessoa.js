const Sequelize = require('sequelize');
const database = require('../config/db');

const pessoa = database.define('pessoa', {
    IDPessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    DtNasc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Cargo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
})

module.exports = pessoa;