const Sequelize = require('sequelize');
const database = require('../config/db');
const serie = require('../model/serie');
const genero = require('../model/genero');

const generoSerie = database.define('generoSerie', {
    IDGeneroSerie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

generoSerie.belongsTo(serie, {
    constraints: true,
    foreignKey: 'IDSerie',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

generoSerie.belongsTo(genero, {
    constraints: true,
    foreignKey: 'IDGenero',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = generoSerie;