// Aqui é definido o inicio do route do express
const express = require('express');
const route = express.Router();

// Importando controllers
const home = require('./src/controllers/home')
const login = require('./src/controllers/login');
const cadastro = require('./src/controllers/cadastro');
const perfil = require('./src/controllers/perfil');
const filmes = require('./src/controllers/filmes');
const series = require('./src/controllers/series');

// Iniciando as rotas
route.get('/:id', home.getHome);

// Get e post do login 
route.get('/login/:id', login.getLoginPage);
route.post('/login', login.postLoginPage);

// Get e Post do registrar
route.get('/cadastrar/:id', cadastro.getCadPage);
route.post('/cadastrar', cadastro.postCadPage);

// Get e Post do perfil
route.get('/perfil', perfil.getPerfilPage)

// Get e Post da aba Filmes
route.get('/filmes/:id', filmes.getFilmesPage)

// Get e Post da aba Series
route.get('/series/:id', series.getSeriesPage)

module.exports = route;

