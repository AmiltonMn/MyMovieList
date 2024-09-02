const tabelaUsuario = require('../model/usuario');

module.exports = {
    async getPerfilPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });

        const dataNascimento = new Date(usuario[0].DtNasc);

        dataNascimento.setDate(dataNascimento.getDate() + 2);

        console.log(dataNascimento);

        usuario[0].DtNasc = dataNascimento.toLocaleDateString('pt-BR');

        res.render('../views/perfil', {usuario});
    }
}