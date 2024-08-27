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
    foreignKey: 'IDPessoa'
});

elencoFilme.belongsTo(filme, {
    constraint: true,
    foreignKey: 'IDFilme'
});

module.exports = elencoFilme;