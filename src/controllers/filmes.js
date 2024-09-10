const tabelaUsuario = require('../model/usuario');
const tabelaFilmes = require('../model/filme');
const tabelaGeneros = require('../model/genero');
const tabelaGenerosFilme = require('../model/generoFilme');
const tabelaListaFilmes = require('../model/listaFilme');
const tabelaPretendoAssistir = require('../model/pretendeAssistirFilme')
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
        let adicionadoPretendoAssistir = false
        let adicionadoFilmeAssistido = false
        let listaGeneros = [];

        const filme = await tabelaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        const idGenerosFilme = await tabelaGenerosFilme.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {IDFilme: id}
        });

        for(let i = 0; i < idGenerosFilme.length; i++)
        {
            listaGeneros[i] = idGenerosFilme[i].IDGenero;
        }

        const generosFilme = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome'],
            where: { IDGenero: listaGeneros }
        });

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome']
        });

        const idFilmeAssistido = await tabelaListaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idFilmePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const dataLancamento = new Date(filme[0].Lancamento);

        dataLancamento.setDate(dataLancamento.getDate() + 2);

        console.log(dataLancamento);

        filme[0].Lancamento = dataLancamento.toLocaleDateString('pt-BR');

        // Verificação para ver se está na lista de filmes
        try {
            if (idFilmeAssistido[0].IDFilme != id) {
                adicionadoFilmeAssistido = false
            } else {
                adicionadoFilmeAssistido = true
            }
        } catch (error) {
            adicionadoFilmeAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idFilmePretendoAssistir[0].IDFilme != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }
        
        res.render('../views/filmeSelec', {filme, usuario, generosFilme, generos, flag: 0, adicionadoPretendoAssistir, adicionadoFilmeAssistido});        
    },

    async addFilmeLista(req, res){

        const dados = req.body
        const id = req.params.id
        const nomeUser = req.params.nomeUser
        let adicionadoPretendoAssistir = false
        let adicionadoFilmeAssistido = false
        let notaFilme = 0;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        await tabelaPretendoAssistir.destroy({
            raw: true,
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const verificarID = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDUsuario: usuario[0].Usuario, IDFilme: id}
        });

        if(verificarID[0].IDFilme == id) {
            pass;
        } else {
            await tabelaListaFilmes.create({
                Comentario: dados.comentarioInput,
                Nota: dados.notaInput,
                IDFilme: id,
                IDUsuario: usuario[0].IDUsuario
            });
        }

        const notas = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        for (let i = 0; i < notas.length; i++) {
            notaFilme += notas[i].Nota;
        };

        notaFilme = notaFilme / notas.length;

        await tabelaFilmes.update({
            NotaGeral: notaFilme
        },
        {
            where: {IDFilme: id}
        });

        const filme = await tabelaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome']
        });
        
        const idGenerosFilme = await tabelaGenerosFilme.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {IDFilme: id}
        });

        let listaGeneros = [];

        for(let i = 0; i < idGenerosFilme.length; i++)
        {
            listaGeneros[i] = idGenerosFilme[i].IDGenero;
        }

        const generosFilme = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome'],
            where: { IDGenero: listaGeneros }
        })

        const idFilmeAssistido = await tabelaListaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idFilmePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const dataLancamento = new Date(filme[0].Lancamento);

        dataLancamento.setDate(dataLancamento.getDate() + 2);

        filme[0].Lancamento = dataLancamento.toLocaleDateString('pt-BR');

        // Verificação para ver se está na lista de filmes
        try {
            if (idFilmeAssistido[0].IDFilme != id) {
                adicionadoFilmeAssistido = false
            } else {
                adicionadoFilmeAssistido = true
            }
        } catch (error) {
            adicionadoFilmeAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idFilmePretendoAssistir[0].IDFilme != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }

        res.render('../views/filmeSelec', {filme, usuario, generosFilme, generos, flag: 1, adicionadoFilmeAssistido, adicionadoPretendoAssistir})
    },

    async deletarFilme(req, res){
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        
        await tabelaFilmes.destroy({where: {IDFilme: id}})

        res.redirect('/filmes/' + nomeUser)
    },

    async editarFilme(req, res){

        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser

        var novaImagem = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['Imagem'],
            where: {IDFilme: id}
        });

        console.log(novaImagem)

        if (req.file) {
            novaImagem = req.file.filename;
        }

        console.log(novaImagem)

        await tabelaFilmes.update({
            Imagem: novaImagem,
            Titulo: dados.novoTitulo,
            Sinopse: dados.novaSinopse,
            Lancamento: dados.novoLancamento,
            IdadeIndicativa: dados.novaIdadeIndicativa
        },
        {
            where: {IDFilme: id}
        });

        let listaNovosGeneros = []

        const IDSgeneros = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {Nome: dados.novosGeneros}
        })

        for (let i = 0; i < IDSgeneros.length; i++) {
            listaNovosGeneros[i] = IDSgeneros[i].IDGenero;
        }

        console.log(listaNovosGeneros);

        await tabelaGenerosFilme.destroy({
            where: {IDFilme: id}
        })

        for (let i = 0; i < listaNovosGeneros.length; i++) {

            await tabelaGenerosFilme.create({
                IDFilme: id,
                IDGenero: listaNovosGeneros[i]
            })
        }

        res.redirect('/filmeSelec/' + id + '/' + nomeUser)
    },

    async addPretendoAssistir(req, res)
    {
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let adicionadoPretendoAssistir = false
        let adicionadoFilmeAssistido = false


        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        await tabelaPretendoAssistir.create({
            IDFilme: id,
            IDUsuario: usuario[0].IDUsuario
        })

        const filme = await tabelaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        const generos = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome']
        });
        
        const idGenerosFilme = await tabelaGenerosFilme.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {IDFilme: id}
        });

        let listaGeneros = [];

        for(let i = 0; i < idGenerosFilme.length; i++)
        {
            listaGeneros[i] = idGenerosFilme[i].IDGenero;
        }

        const generosFilme = await tabelaGeneros.findAll({
            raw: true,
            attributes: ['Nome'],
            where: { IDGenero: listaGeneros }
        })

        const idFilmeAssistido = await tabelaListaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idFilmePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
        })

        const dataLancamento = new Date(filme[0].Lancamento);

        dataLancamento.setDate(dataLancamento.getDate() + 2);

        filme[0].Lancamento = dataLancamento.toLocaleDateString('pt-BR');

        // Verificação para ver se está na lista de filmes
        try {
            if (idFilmeAssistido[0].IDFilme != id) {
                adicionadoFilmeAssistido = false
            } else {
                adicionadoFilmeAssistido = true
            }
        } catch (error) {
            adicionadoFilmeAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idFilmePretendoAssistir[0].IDFilme != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }

        res.render('../views/filmeSelec', {filme, usuario, generosFilme, generos, flag: 1, adicionadoFilmeAssistido, adicionadoPretendoAssistir})
        
    }
}