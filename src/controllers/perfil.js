const tabelaUsuario = require('../model/usuario');
const tabelaListaFilme = require('../model/listaFilme');
const tabelaFilmes = require('../model/filme');

module.exports = {
    async getPerfilPage(req, res){
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
            where: {Usuario: nomeUser}
        });
        console.log(usuario)
        
        const dataNascimento = new Date(usuario[0].DtNasc);
    
        dataNascimento.setDate(dataNascimento.getDate() + 2);

        usuario[0].DtNasc = dataNascimento.toLocaleDateString('pt-BR');

        
        const lista = await tabelaListaFilme.findAll({
            raw: true,
            where: {IDUsuario: usuario[0].IDUsuario}
        })
        
        const listaIDFilmes = await tabelaListaFilme.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDUsuario: usuario[0].IDUsuario}
        })
        
        let IDSFilmes = [];
        
        for (let i = 0; i < listaIDFilmes.length; i++) 
        {
            IDSFilmes[i] = listaIDFilmes[i].IDFilme;
        }
            
        console.log(IDSFilmes)
        
        const filmes = await tabelaFilmes.findAll({
            raw: true,
            where: {IDFilme: [IDSFilmes]}
        })
        
        res.render('../views/perfil', {usuario, filmes, lista});
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