const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('../model/usuario');

const comentario = database.define('comentario', {
    IDComentario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Descricao: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Resposta: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});

comentario.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

comentario.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuarioAdmin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: true
});

module.exports = comentario;