const { defaultValueSchemable, toDefaultValue } = require('sequelize/lib/utils');
const tabelaFilmes = require('../model/filme');

module.exports = {
    async getFilmesPage(req, res){

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        })

        res.render('../views/filmes', {filmes});
    },

    
    async addFilme(req, res){
        const dados = req.body
        let capaFilme = dados.imagemInput;

        if (capaFilme == null) {
            capaFilme = './img/noImage.png'
        }

        await tabelaFilmes.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            IdadeIndicativa: dados.idadeIndicativaInput,
            Imagem: capaFilme,
        });

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        })

        res.render('../views/filmes', {filmes})
    }
}