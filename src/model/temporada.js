const Sequelize = require('sequelize');
const database = require('../config/db');
const serie = require('../model/serie')

const temporada = database.define('temporada', {
    IDTemporada: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Sinopes: {
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

temporada.belongsTo(serie, {
    constraints: true,
    foreignKey: 'IDSerie',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = temporada;