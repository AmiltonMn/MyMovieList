// Aqui é definido o inicio do route do express
const express = require('express');
const multer = require('multer');
const route = express.Router();

// Importando controllers
const home = require('./src/controllers/home')
const login = require('./src/controllers/login');
const cadastro = require('./src/controllers/cadastro');
const perfil = require('./src/controllers/perfil');
const filmes = require('./src/controllers/filmes');
const series = require('./src/controllers/series');
const config = require('./src/config/multer')

// Iniciando as rotas

// Get e post do login 
route.get('/login', login.getLoginPage);
route.post('/login', login.postLoginPage);

// Get e Post do registrar
route.get('/cadastrar', cadastro.getCadPage);
route.post('/cadastrar', cadastro.postCadPage);

// Get e Post do perfil
route.get('/perfil/:nomeUser', perfil.getPerfilPage);
route.post('/updatePerfil/:nomeUser', perfil.atualizarPerfil);

// Get e Post da Filmes
route.get('/filmes/:nomeUser', filmes.getFilmesPage);
route.post('/filmes/:nomeUser', multer(config).single("imagemInput"), filmes.addFilme);
route.post('/buscaFilmes/:nomeUser', filmes.buscarFilmes);

// Get e Post da pagina de filme selecionado
route.get('/filmeSelec/:id/:nomeUser', filmes.filmeSelecionado);

// Get e Post da Series
route.get('/series/:nomeUser', series.getSeriesPage);
route.post('/series/:nomeUser', multer(config).single("imagemInput"), series.addSerie);
route.post('/buscaSeries/:nomeUser', series.buscarSeries);
route.post('/updateSeries/:id/:nomeUser', multer(config).single("imagemInput"), series.atualizarSerie);
route.post('/addTemp/:id/:nomeUser', multer(config).single("imagemInput"), series.addTemp);
route.post('/addEp/:id/:nomeUser', multer(config).single("imagemInput"), series.addEp);
route.post('/updateTemp/:id/:nomeUser', multer(config).single("imagemInput"), series.atualizarTemporada);
route.post('/updateEp/:id/:nomeUser', multer(config).single("imagemInput"), series.atualizarEp);

// Get e Post da pagina de serie selecionada
route.get('/serieSelec/:id/:nomeUser', series.getSerieSelecionada);

// Get e Post da home
route.get('/', home.getHome);
route.get('/:nomeUser', home.getHome);


module.exports = route;

