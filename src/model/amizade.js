const usuario = require('../model/usuario');

const Sequelize = require('sequelize');
const database = require('../config/db');

const amizade = database.define('amizade', {
    IDAmizade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

amizade.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDAmigo0'
});

amizade.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDAmigo1'
});

module.exports = amizade;