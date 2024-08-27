const Sequelize = require('sequelize');
const database = require('../config/db');
const pessoa = require('../model/pessoa');
const filme = require('../model/filme');

const elencoFilme = database.define('elencoFilme', {
    IDElencoFilme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

elencoFilme.belongsTo(pessoa, {
    constraint: true,
    foreignKey: 'IDPessoa',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

elencoFilme.belongsTo(filme, {
    constraint: true,
    foreignKey: 'IDFilme',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = elencoFilme;