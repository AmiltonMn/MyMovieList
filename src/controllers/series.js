const tabelaUsuario = require('../model/usuario');
const tabelaSerie = require('../model/serie');
const tabelaTemporada = require('../model/temporada');
const tabelaEp = require('../model/ep');
const { Op, where } = require('sequelize');
const { raw } = require('express');
const usuario = require('../model/usuario');

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

        const temporada = await tabelaTemporada.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        var temporadaIDS = []

        for (let i = 0; i < temporada.length; i++) {
            temporadaIDS[i] = temporada[i].IDTemporada;   
        }

        const ep = await tabelaEp.findAll({
            raw: true,
            where: {IDTemporada: {
                [Op.in]: temporadaIDS
            }}
        })

        res.render('../views/serieSelec', {serie, usuario, temporada, ep});
    },

    async atualizarSerie(req, res){
        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let capaSerie = 'noImage.png';

        if (req.file) {
            capaSerie = req.file.filename;
        }

        await tabelaSerie.update({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            IdadeIndicativa: dados.idadeIndicativaInput,
            Imagem: capaSerie,
        },
        {
            where: { IDSerie: id }
        });
        res.redirect('/serieSelec/' + id + '/' + nomeUser);
    },

    async addTemp(req, res){
        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let capaTemp = 'noImage.png';

        if (req.file) {
            capaTemp = req.file.filename;
        }

        await tabelaTemporada.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            Imagem: capaTemp,
            IDSerie: id
        });

        res.redirect('/serieSelec/' + id + '/' + nomeUser);
    },

    async addEp(req, res){
        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let capaEp = 'noImage.png';

        if (req.file) {
            capaEp = req.file.filename;
        }

        await tabelaEp.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            Imagem: capaEp,
            IDTemporada: id
        });

        const idSerie = await tabelaTemporada.findAll({
            raw: true,
            where: {IDTemporada: id}
        })

        res.redirect('/serieSelec/' + idSerie[0].IDSerie + '/' + nomeUser);
    }
}