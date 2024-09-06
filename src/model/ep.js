const Sequelize = require('sequelize');
const database = require('../config/db');
const temporada = require('../model/temporada')

const ep = database.define('ep', {
    IDEp: {
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
    Imagem: {
        type: Sequelize.STRING(255),
        defaultValue: 'noImage',
        allowNull: false
    }
});

ep.belongsTo(temporada, {
    constraint: true,
    foreignKey: 'IDTemporada',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = ep;