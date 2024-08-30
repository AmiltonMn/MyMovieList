const sequelize = require('sequelize');
const usuario = require('../model/usuario');

module.exports = {

    async getLoginPage(req, res){
        const id = req.params.id;

        const usuario = await usuarios.findByPk(id, {
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'Email', 'DtNasc', 'Imagem']
        })

        res.render('../views/login', {usuario})
    },

    async postLoginPage(req, res){
        const dados = req.body;
        const usuario = await usuarios.findAll({
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