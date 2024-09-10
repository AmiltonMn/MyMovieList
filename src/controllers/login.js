const tabelaUsuario = require('../model/usuario');
const tabelaFilme = require('../model/filme');
const tabelaSerie = require('../model/serie');
const { Op } = require('sequelize');

module.exports = {

    async getLoginPage(req, res){

        res.render('../views/login')
    },

    async postLoginPage(req, res){
        const dados = req.body;
        const usuarios = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {[Op.or]: [{Usuario: dados.usuarioEmail}, {Email: dados.usuarioEmail}],  Senha: dados.senha}
        });
        const filmesMaisRecentes = await tabelaFilme.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        })

        const filmesMelhorAvaliados = await tabelaFilme.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        })

        const seriesMaisRecentes = await tabelaSerie.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        });

        const seriesMelhorAvaliados = await tabelaSerie.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        });
        
        
        try {
            usuarios[0].IDUsuario;
            res.render('../views/home', {usuario: usuarios, filmesMaisRecentes, filmesMelhorAvaliados, seriesMaisRecentes, seriesMelhorAvaliados});
        } catch (error) {
            res.redirect('/login');
        }
    }

}