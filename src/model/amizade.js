const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');

const amizade = database.define('amizade', {
    State: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

amizade.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'Seguidor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

amizade.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'Seguido',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = amizade;