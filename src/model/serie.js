const Sequelize = require('sequelize');
const database = require('../config/db');

const serie = database.define('serie', {
    IDSerie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Sinopse: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    Lancamento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    NotaGeral: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    IdadeIndicativa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Imagem: {
        type: Sequelize.STRING(255),
        defaultValue: 'noImage',
        allowNull: false
    }
});

module.exports = serie;