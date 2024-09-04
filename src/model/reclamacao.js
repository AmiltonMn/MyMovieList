const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('./usuario');

const reclamacao = database.define('reclamacao', {
    IDReclamacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Descricao: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    Resposta: {
        type: Sequelize.STRING(1000),
        allowNull: true
    }
});

reclamacao.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

reclamacao.belongsTo(usuario, {
    constraints: true,
    foreignKey: 'IDUsuarioAdmin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: true
});

module.exports = reclamacao;