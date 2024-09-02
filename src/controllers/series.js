const tabelaUsuario = require('../model/usuario');
const tabelaSerie = require('../model/serie');
const tabelaTemporada = require('../model/temporada');
const tabelaEp = require('../model/ep');
const { Op, where } = require('sequelize');
const { raw } = require('express');

module.exports = {
    async getSeriesPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        const series = await tabelaSerie.findAll({
            raw: true,
        })

        res.render('../views/series', {usuario, series});
    },

    async addSerie(req, res){
        const dados = req.body;
        const nomeUser = req.params.nomeUser;
        let capaSerie = 'noImage.png';

        if (req.file) {
            capaSerie = req.file.filename;
        }
        
        await tabelaSerie.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            IdadeIndicativa: dados.idadeIndicativaInput,
            Imagem: capaSerie,
        });

        const series = await tabelaSerie.findAll({
            raw: true,
            attributes: ['IDSerie', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        });


        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        res.render('../views/series', {series, usuario});
    },

    async buscarSeries(req, res){
        const dados = req.body;
        const nomeUser = req.params.nomeUser;
        let tituloBusca = dados.buscaSerie;

        const series = await tabelaSerie.findAll({
            raw: true,
            where: {Titulo: {[Op.like]: `%${tituloBusca}%`}}
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        res.render('../views/series', {series, usuario});
    },

    async getSerieSelecionada(req, res){
        const nomeUser = req.params.nomeUser;
        const id = req.params.id;

        const serie = await tabelaSerie.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        const temporadas = await tabelaTemporada.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        const eps = await tabelaEp.findAll({
            raw: true,
            where: {IDTemporada: {
                [Op.in]: temporadas.IDTemporada
            }}
        })

        res.render('../views/serieSelec', {serie, usuario, temporadas, eps});
    }
}