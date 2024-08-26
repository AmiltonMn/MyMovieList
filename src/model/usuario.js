const Sequelize = require('sequelize');
const database = require('../config/db');

const usuario = database.define('usuario', {
    IDUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
})