const Sequelize = require('sequelize');
const database = require('../config/db');

const filme = database.define('filme', {
    IDFilme: {
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
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Lancamento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    NotaGeral: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    IdadeIndicativa: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = filme;