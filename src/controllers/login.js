const sequelize = require('sequelize');
const usuario = require('../model/usuario');

module.exports = {

    async getLoginPage(req, res){
        res.render('../views/login')
    },

    async postLoginPage(req, res){
        const dados = req.body;
        const usuarios = await usuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: dados.usuarioEmail, Senha: dados.senha}
        });

        try {
            usuarios[0].IDUsuario;
            res.render('../views/home.ejs', {usuario: usuarios});
        } catch (error) {
            res.redirect('/login');
        }
    }
}