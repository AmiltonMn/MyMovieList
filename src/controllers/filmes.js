const tabelaUsuario = require('../model/usuario');
const tabelaFilmes = require('../model/filme');
const tabelaGeneros = require('../model/genero');
const tabelaGenerosFilme = require('../model/generoFilme');
const { Op, where } = require('sequelize');
const { raw } = require('express');

module.exports = {
    async getFilmesPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        })

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['IDGenero', 'Nome']
        })

        res.render('../views/filmes', {filmes, usuario, erro: 0, generos});
    },

    
    async addFilme(req, res){
        const dados = req.body
        const nomeUser = req.params.nomeUser;

        console.log(dados.inputGenero)

        let capaFilme = 'noImage.png';

        const erro = await tabelaFilmes.count({
            raw: true,
            where: {Titulo: dados.tituloInput}
        })

        if (req.file) {
            capaFilme = req.file.filename;
        }

        
        if(erro == 0){
            await tabelaFilmes.create({
                Titulo: dados.tituloInput,
                Sinopse: dados.sinopseInput,
                Lancamento: dados.lancamentoInput,
                NotaGeral: 0,
                IdadeIndicativa: dados.idadeIndicativaInput,
                Imagem: capaFilme
            });
        }

        const IDNovoFilme = await tabelaFilmes.findAll({
            raw: true,
            where: {Titulo: dados.tituloInput}
        })
        
        for (let i = 0; i < dados.inputGenero.length; i++) {
            await tabelaGenerosFilme.create({
                IDFilme: IDNovoFilme[0].IDFilme,
                IDGenero: dados.inputGenero[i]
            });
        }

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['IDGenero', 'Nome']
        })

        res.render('../views/filmes', {filmes, usuario, erro, generos})

    },

    async buscarFilmes(req, res){
        const dados = req.body;
        const nomeUser = req.params.nomeUser;
        let tituloBusca = dados.buscaFilme;

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem'],
            where: {Titulo: {[Op.like]: `%${tituloBusca}%`}}
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['IDGenero', 'Nome']
        })

        res.render('../views/filmes', {filmes, usuario, erro: 0, generos})
    },

    async filmeSelecionado(req, res){
        const nomeUser = req.params.nomeUser;
        const id = req.params.id;

        const filme = await tabelaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        res.render('../views/filmeSelec', {filme, usuario});
    }
}