const { NOW } = require('sequelize');
const tabelaUsuario = require('../model/usuario');

module.exports = {
    async getPerfilPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });
        console.log(usuario);

        const dataNascimento = new Date(usuario[0].DtNasc);

        console.log(dataNascimento);

        dataNascimento.setDate(dataNascimento.getDate() + 2);

        console.log(dataNascimento);

        usuario[0].DtNasc = dataNascimento.toLocaleDateString('pt-BR');

        console.log(usuario[0].DtNasc);


        res.render('../views/perfil', {usuario});
    },

    async atualizarPerfil(req, res){
        const dados = req.body;
        const nomeUser = req.params.nomeUser;

        await tabelaUsuario.update({
            Usuario: dados.usuarioInput,
            Nome: dados.nomeInput,
            DtNasc: dados.dtNascInput,
            Senha: dados.senhaInput,
            Email: dados.emailInput
        },
        {
            where: { Usuario: nomeUser }
        });
        res.redirect('/perfil/' + nomeUser);
    }
}