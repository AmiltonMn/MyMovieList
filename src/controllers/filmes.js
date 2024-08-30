const tabelaUsuario = require('../model/usuario');
const tabelaFilmes = require('../model/filme');

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

        res.render('../views/filmes', {filmes, usuario});
    },

    
    async addFilme(req, res){
        const dados = req.body
        const nomeUser = req.params.nomeUser;

        let capaFilme = 'noImage.png';

        console.log(capaFilme)
        console.log(req.file)
        console.log(req.file.originalname)
        console.log(req.file.filename)


        if (req.file) {
            capaFilme = req.file.filename;
        }

        await tabelaFilmes.create({
            Titulo: dados.tituloInput,
            Sinopse: dados.sinopseInput,
            Lancamento: dados.lancamentoInput,
            NotaGeral: 0,
            IdadeIndicativa: dados.idadeIndicativaInput,
            Imagem: capaFilme
        });

        const filmes = await tabelaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme', 'Titulo', 'Sinopse', 'Lancamento', 'NotaGeral', 'IdadeIndicativa', 'Imagem']
        })

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });


        res.render('../views/filmes', {filmes, usuario})
    }
}