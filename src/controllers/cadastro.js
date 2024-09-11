const usuarios = require('../model/usuario');

module.exports = {
    async getCadPage(req, res){
        res.render('../views/cadastrar')
    },

    async postCadPage(req, res){
        const dados = req.body;

        let imagemPerfil = 'noImage.png'

        if (usuarioInput = "AmiltonAdm") {
            await usuarios.create({
                Usuario: dados.usuarioInput,
                Nome: dados.nomeInput,
                DtNasc: dados.dtNascInput,
                Senha: dados.senhaInput,
                Email: dados.emailInput,
                ISAdmin: 1,
                Imagem: imagemPerfil
            });
        } else {
            await usuarios.create({
                Usuario: dados.usuarioInput,
                Nome: dados.nomeInput,
                DtNasc: dados.dtNascInput,
                Senha: dados.senhaInput,
                Email: dados.emailInput,
                Imagem: imagemPerfil
            });
        }


        res.render('../views/login');
    }
}