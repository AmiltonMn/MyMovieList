const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');
const filme = require('../model/filme');

const listaFilme = database.define('listaFilme', {
    IDListaFilme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Favorito: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})

listaFilme.belongsTo(filme, {
    constraints: true,
    foreignKey: 'IDFilme',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

listaFilme.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = listaFilme;