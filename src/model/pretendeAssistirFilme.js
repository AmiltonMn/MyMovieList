const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');
const filme = require('../model/filme');

const pretendeAssistirFilme = database.define('pretendeAssistirFilme', {
    IDPAF: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

pretendeAssistirFilme.belongsTo(filme, {
    constraints: true,
    foreignKey: 'IDFilme'
});

pretendeAssistirFilme.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuario'
});

module.exports = pretendeAssistirFilme;