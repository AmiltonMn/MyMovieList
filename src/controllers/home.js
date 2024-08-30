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
    async getHome(req, res){

        await amizade
        await elencoFilme
        await elencoSerie
        await ep
        await filme
        await listaFilme
        await listaSerie
        await pessoa
        await pretendeAssistirFilme
        await pretendeAssistirSerie
        await reclamacao
        await serie
        await temporada
        await usuario

        res.render('../views/home', {usuario: []});
    }
}