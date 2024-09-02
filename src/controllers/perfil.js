const tabelaUsuario = require('../model/usuario');

module.exports = {
    async getPerfilPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });
        console.log(usuario);
        // usuario[0].DtNasc++;
        
        // parseInt(usuario[0].DtNasc) += 1;
        
        // console.log(usuario);

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