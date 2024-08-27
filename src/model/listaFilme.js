const Sequelize = require('sequelize');
const database = require('../config/db');

const listaFilme = database.define('listaFilme', {
    IDlistaFilme: {
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
    foreignKey: 'IDFilme'
});

listaFilme.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuario'
});

module.exports = listaFilme;