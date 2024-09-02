const tabelaUsuario = require('../model/usuario');
const { Op } = require('sequelize');

module.exports = {

    async getLoginPage(req, res){
        // const id = req.params.id;

        // const usuario = await usuarios.findByPk(id, {
        //     raw: true,
        //     attributes: ['IDUsuario', 'Usuario', 'Nome', 'Email', 'DtNasc', 'Imagem']
        // })

        res.render('../views/login')
    },

    async postLoginPage(req, res){
        const dados = req.body;
        const usuarios = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {[Op.or]: [{Usuario: dados.usuarioEmail}, {Email: dados.usuarioEmail}],  Senha: dados.senha}
        });

        try {
            usuarios[0].IDUsuario;
            res.render('../views/home', {usuario: usuarios});
        } catch (error) {
            res.redirect('/login');
        }
    }

}