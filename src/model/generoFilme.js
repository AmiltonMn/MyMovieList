const Sequelize = require('sequelize');
const database = require('../config/db');
const filme = require('../model/filme');
const genero = require('../model/genero');

const generoFilme = database.define('generoFilme', {
    IDGeneroFilme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

generoFilme.belongsTo(filme, {
    constraints: true,
    foreignKey: 'IDFilme',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

generoFilme.belongsTo(genero, {
    constraints: true,
    foreignKey: 'IDGenero',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = generoFilme;