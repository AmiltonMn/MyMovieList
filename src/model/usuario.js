const Sequelize = require('sequelize');
const database = require('../config/db');

const usuario = database.define('usuario', {
    IDUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    NickName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    DtNasc: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
})