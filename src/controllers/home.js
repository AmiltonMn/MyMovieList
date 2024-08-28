const amizade = require('../model/amizade');
const elencoFilme = require('../model/elencoFilme');
const elencoSerie = require('../model/elencoSerie');
const filme = require('../model/filme');
const listaFilme = require('../model/listaFilme');
const listaSerie = require('../model/listaSerie');
const pretendeAssistirFilme = require('../model/pretendeAssistirFilme');
const pretendeAssistirSerie = require('../model/pretendeAssistirSerie');
const reclamacao = require('../model/reclamacao');
const serie = require('../model/serie');
const temporada = require('../model/temporada');
const usuario = require('../model/usuario');
const ep = require('../model/ep');
const pessoa = require('../model/pessoa');

module.exports = {
    async pagInicialGet(req, res){

        await amizade.findAll
        await elencoFilme.findAll
        await elencoSerie.findAll
        await ep.findAll
        await filme.findAll
        await listaFilme.findAll
        await listaSerie.findAll
        await pessoa.findAll
        await pretendeAssistirFilme.findAll
        await pretendeAssistirSerie.findAll
        await reclamacao.findAll
        await serie.findAll
        await temporada.findAll
        await usuario.findAll

        res.render('../views/home');
    }
}