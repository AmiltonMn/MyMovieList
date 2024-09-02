const Sequelize = require('sequelize');
const database = require('../config/db');
const pessoa = require('../model/pessoa');
const serie = require('../model/serie');

const elencoSerie = database.define('elencoSerie', {
    IDElencoSerie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

elencoSerie.belongsTo(pessoa, {
    constraint: true,
    foreignKey: 'IDPessoa',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

elencoSerie.belongsTo(serie, {
    constraint: true,
    foreignKey: 'IDSerie',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = elencoSerie;