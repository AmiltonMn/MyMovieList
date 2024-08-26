// Aqui é definido o inicio do route do express
const express = require('express');
const route = express.Router();

// Importando controllers
const home = require('./src/controllers/home')

// Iniciando as rotas
route.get('/', home.pagInicialGet);

module.exports = route;