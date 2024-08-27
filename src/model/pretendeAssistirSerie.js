const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');
const serie = require('../model/serie');

const pretendeAssistirSerie = database.define('pretendeAssistirSerie', {
    IDPAS: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

pretendeAssistirSerie.belongsTo(usuario, {
    constraint: true,
    foreignKey: 'IDUsuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

pretendeAssistirSerie.belongsTo(serie, {
    constraint: true,
    foreignKey: 'IDSerie',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = pretendeAssistirSerie;