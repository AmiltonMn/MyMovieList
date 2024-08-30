const tabelaUsuario = require('../model/usuario');
const tabelaSerie = require('../model/serie');
const usuario = require('../model/usuario');

module.exports = {
    async getSeriesPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        res.render('../views/series', {usuario});
    },

    async addSerie(req, res){
        const dados = req.body
        let capaFilme = dados.imagemInput;

        if (capaFilme == null) {
            capaFilme = './img/noImage.png'
        };

        await tabelaSerie.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            IdadeIndicativa: dados.idadeIndicativaInput,
            Imagem: capaFilme,
        });

        const series = await tabelaSerie.findAll({
            raw: true,
            attributes: ['IDSerie', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        });

        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        res.render('../views/series', {series, usuario});
    }
}