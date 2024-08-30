const usuarios = require('../model/usuario');

module.exports = {
    async getCadPage(req, res){
        const id = req.params.id;

        const usuario = await usuarios.findByPk(id, {
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'Email', 'DtNasc', 'Imagem']
        })

        res.render('../views/cadastrar', {usuario})
    },

    async postCadPage(req, res){
        const dados = req.body;

        await usuarios.create({
            Usuario: dados.usuarioInput,
            Nome: dados.nomeInput,
            DtNasc: dados.dtNascInput,
            Senha: dados.senhaInput,
            Email: dados.emailInput,
        });

        res.render('../views/login');
    }
}