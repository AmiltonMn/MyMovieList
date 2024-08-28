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
    Sinpopse: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Lancamento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    NotaGeral: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    Imagem: {
        type: Sequelize.STRING(255),
        defaultValue: 'noImage',
        allowNull: false
    }
});

module.exports = serie;