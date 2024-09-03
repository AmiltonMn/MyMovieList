const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');
const serie = require('../model/serie');

const listaSerie = database.define('listaSerie', {
    IDListaSerie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Favorito: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },

    Comentario: {
        type: Sequelize.STRING(1000),
        allowNull: true
    },

    Nota: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

listaSerie.belongsTo(usuario, {
    constraint: true,
    foreignKey: 'IDUsuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

listaSerie.belongsTo(serie, {
    constraint: true,
    foreignKey: 'IDSerie',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = listaSerie;