const usuario = require('../model/usuario');

module.exports = {
    async getCadPage(req, res){
        res.render('../views/cadastrar')
    },

    async postCadPage(req, res){
        const dados = req.body;

        await usuario.create({
            Usuario: dados.usuarioInput,
            Nome: dados.nomeInput,
            DtNasc: dados.dtNascInput,
            Senha: dados.senhaInput,
            Email: dados.emailInput,
        });

        res.render('../views/login');
    }
}