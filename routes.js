// Aqui é definido o inicio do route do express
const express = require('express');
const route = express.Router();

// Importando controllers
const home = require('./src/controllers/home')
const login = require('./src/controllers/login');
const cadastro = require('./src/controllers/cadastro');
const perfil = require('./src/controllers/perfil');

// Iniciando as rotas
route.get('/', home.getHome);

// Get e post do login 
route.get('/login', login.getLoginPage);
route.post('/login', login.postLoginPage);

// Get e Post do registrar
route.get('/registrar', cadastro.getRegPage);

// Get e Post do perfil
route.get('/perfil', perfil.getPerfilPage)

module.exports = route;

