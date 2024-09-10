const tabelaUsuario = require('../model/usuario');
const tabelaSerie = require('../model/serie');
const tabelaTemporada = require('../model/temporada');
const tabelaEp = require('../model/ep');
const tabelaGenero = require('../model/genero');
const tabelaGeneroSerie = require('../model/generoSerie');
const tabelaListaSerie = require('../model/listaSerie');
const tabelaPretendoAssistir = require('../model/pretendeAssistirSerie');
const { Op, where } = require('sequelize');
const { raw } = require('express');
const usuario = require('../model/usuario');

module.exports = {
    async getSeriesPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        const series = await tabelaSerie.findAll({
            raw: true,
        })

        const generos = await tabelaGenero.findAll({
            raw: true
        });

        res.render('../views/series', {usuario, series, generos});
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

        const IDNovaSerie = await tabelaSerie.findAll({
            raw: true,
            where: {Titulo: dados.tituloInput}
        });

        for (let i = 0; i < dados.inputGenero.length; i++) {
            await tabelaGeneroSerie.create({
                IDSerie: IDNovaSerie[0].IDSerie,
                IDGenero: dados.inputGenero[i]
            });
        }

        const series = await tabelaSerie.findAll({
            raw: true,
            attributes: ['IDSerie', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        });


        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        res.redirect('/series/' + nomeUser);
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
        let adicionadoPretendoAssistir = false;
        let adicionadoSerieAssistido = false;

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

        const genero = await tabelaGeneroSerie.findAll({
            raw: true,
            include: [{model: tabelaGenero}],
            where: {IDSerie: id}
        });

        const idSerieAssistido = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idSeriePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const comentarios = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['Comentario', 'Nota'],
            include: [{model: tabelaUsuario, attributes: ['Usuario', 'Imagem']}],
            where: {IDSerie: id}
        });

        try {
            if (idSerieAssistido[0].IDSerie != id) {
                adicionadoSerieAssistido = false
            } else {
                adicionadoSerieAssistido = true
            }
        } catch (error) {
            adicionadoSerieAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idSeriePretendoAssistir[0].IDSerie != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }

        res.render('../views/serieSelec', {serie, usuario, temporada, ep, genero, flag: 0, adicionadoPretendoAssistir, adicionadoSerieAssistido, comentarios});
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
    },

    async atualizarTemporada(req, res){
        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let capaTemp = 'noImage.png';

        if (req.file) {
            capaTemp = req.file.filename;
        }

        const idSerie = await tabelaTemporada.findAll({
            raw: true,
            where: {IDTemporada: id}
        })

        await tabelaTemporada.update({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            Imagem: capaTemp,
        },
        {
            where: { IDTemporada: id }
        });
        res.redirect('/serieSelec/' + idSerie[0].IDSerie + '/' + nomeUser);
    },

    async atualizarEp(req, res){
        const dados = req.body;
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let capaEp = 'noImage.png';

        if (req.file) {
            capaEp = req.file.filename;
        }

        const idTemporada = await tabelaEp.findAll({
            raw: true,
            where: {IDEp: id}
        });

        const idSerie = await tabelaTemporada.findAll({
            raw: true,
            where: {IDTemporada: idTemporada[0].IDTemporada}
        });

        await tabelaEp.update({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            Imagem: capaEp,
        },
        {
            where: { IDEp: id }
        });
        res.redirect('/serieSelec/' + idSerie[0].IDSerie + '/' + nomeUser);
    },

    async deletarSerie(req, res){
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        
        await tabelaSerie.destroy({where: {IDSerie: id}})

        res.redirect('/series/' + nomeUser)
    },

    async deletarTemp(req, res){
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;

        let idSerie = await tabelaTemporada.findAll({
            raw: true,
            where: {IDTemporada: id}
        })

        idSerie = idSerie[0].IDSerie;
        
        await tabelaTemporada.destroy({where: {IDTemporada: id}})

        res.redirect('/serieSelec/' + idSerie + '/' + nomeUser);
    },

    async deletarEp(req, res){
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;

        const idTemporada = await tabelaEp.findAll({
            raw: true,
            where: {IDEp: id}
        });

        let idSerie = await tabelaTemporada.findAll({
            raw: true,
            where: {IDTemporada: idTemporada[0].IDTemporada}
        });

        idSerie = idSerie[0].IDSerie;
        
        await tabelaEp.destroy({where: {IDEp: id}})

        res.redirect('/serieSelec/' + idSerie + '/' + nomeUser);
    },

    async addSerieLista(req, res){
        const dados = req.body
        const id = req.params.id
        const nomeUser = req.params.nomeUser
        let adicionadoPretendoAssistir = false
        let adicionadoSerieAssistido = false
        let notaFilme = 0;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        await tabelaPretendoAssistir.destroy({
            raw: true,
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        await tabelaListaSerie.create({
            Comentario: dados.comentarioInput,
            Nota: dados.notaInput,
            IDSerie: id,
            IDUsuario: usuario[0].IDUsuario
        });

        const notas = await tabelaListaSerie.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        let notaSerie = 0;

        for (let i = 0; i < notas.length; i++) {
            notaSerie += notas[i].Nota;
        };

        notaSerie = notaSerie / notas.length;

        await tabelaSerie.update({
            NotaGeral: notaSerie
        },
        {
            where: {IDSerie: id}
        });

        const serie = await tabelaSerie.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        const genero = await tabelaGeneroSerie.findAll({
            raw: true,
            include: [{model: tabelaGenero}],
            where: {IDSerie: id}
        });
        
        const idGenerosSerie = await tabelaGeneroSerie.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {IDSerie: id}
        });

        let listaGeneros = [];

        for(let i = 0; i < idGenerosSerie.length; i++)
        {
            listaGeneros[i] = idGenerosSerie[i].IDGenero;
        }

        const generosSerie = await tabelaGenero.findAll({
            raw: true,
            attributes: ['Nome'],
            where: { IDGenero: listaGeneros }
        })

        const idSerieAssistido = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idSeriePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const dataLancamento = new Date(serie[0].Lancamento);

        dataLancamento.setDate(dataLancamento.getDate() + 2);

        serie[0].Lancamento = dataLancamento.toLocaleDateString('pt-BR');

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

        const comentarios = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['Comentario', 'Nota'],
            include: [{model: tabelaUsuario, attributes: ['Usuario', 'Imagem']}],
            where: {IDSerie: id}
        });

        // Verificação para ver se está na lista de filmes
        try {
            if (idSerieAssistido[0].IDSerie != id) {
                adicionadoSerieAssistido = false
            } else {
                adicionadoSerieAssistido = true
            }
        } catch (error) {
            adicionadoSerieAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idSeriePretendoAssistir[0].IDSerie != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }

        res.render('../views/serieSelec', {serie, usuario, generosSerie, genero, temporada, ep, flag: 1, adicionadoSerieAssistido, adicionadoPretendoAssistir, comentarios});
    },

    async addPretendoAssistir(req, res)
    {
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let adicionadoPretendoAssistir = false
        let adicionadoSerieAssistido = false


        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        await tabelaPretendoAssistir.create({
            IDSerie: id,
            IDUsuario: usuario[0].IDUsuario
        })

        const serie = await tabelaSerie.findAll({
            raw: true,
            where: {IDSerie: id}
        });

        const generos = await tabelaGenero.findAll({
            raw: true,
            attributes: ['Nome']
        });

        const genero = await tabelaGeneroSerie.findAll({
            raw: true,
            include: [{model: tabelaGenero}],
            where: {IDSerie: id}
        });
        
        const idGenerosSerie = await tabelaGeneroSerie.findAll({
            raw: true,
            attributes: ['IDGenero'],
            where: {IDSerie: id}
        });

        let listaGeneros = [];

        for(let i = 0; i < idGenerosSerie.length; i++)
        {
            listaGeneros[i] = idGenerosSerie[i].IDGenero;
        }

        const generosSerie = await tabelaGenero.findAll({
            raw: true,
            attributes: ['Nome'],
            where: { IDGenero: listaGeneros }
        })

        const idSerieAssistido = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const idSeriePretendoAssistir = await tabelaPretendoAssistir.findAll({
            raw: true,
            attributes: ['IDSerie'],
            where: {IDSerie: id, IDUsuario: usuario[0].IDUsuario}
        })

        const dataLancamento = new Date(serie[0].Lancamento);

        dataLancamento.setDate(dataLancamento.getDate() + 2);

        serie[0].Lancamento = dataLancamento.toLocaleDateString('pt-BR');

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

        const comentarios = await tabelaListaSerie.findAll({
            raw: true,
            attributes: ['Comentario', 'Nota'],
            include: [{model: tabelaUsuario, attributes: ['Usuario', 'Imagem']}],
            where: {IDSerie: id}
        });

        // Verificação para ver se está na lista de filmes
        try {
            if (idSerieAssistido[0].IDSerie != id) {
                adicionadoSerieAssistido = false
            } else {
                adicionadoSerieAssistido = true
            }
        } catch (error) {
            adicionadoSerieAssistido = false;
        }

        // Verificação para ver se já está na lista "Quero Assistir"
        try {
            if (idSeriePretendoAssistir[0].IDSerie != id) {
                adicionadoPretendoAssistir = false
            } else {
                adicionadoPretendoAssistir = true
            }
        } catch (error) {
            adicionadoPretendoAssistir = false;
        }

        res.render('../views/serieSelec', {serie, usuario, genero, flag: 1, adicionadoSerieAssistido, adicionadoPretendoAssistir, temporada, ep, comentarios})
        
    }
}