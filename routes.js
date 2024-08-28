// Aqui é definido o inicio do route do express
const express = require('express');
const route = express.Router();

// Importando controllers
const home = require('./src/controllers/home')
const login = require('./src/controllers/login');
const cadastro = require('./src/controllers/cadastro');

// Iniciando as rotas
route.get('/', home.getHome);
route.get('/login', login.getLoginPage);
route.post('/login', login.postLoginPage);


route.get('/registrar', cadastro.getRegPage);

module.exports = route;