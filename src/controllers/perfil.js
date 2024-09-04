const tabelaUsuario = require('../model/usuario');
const tabelaListaFilme = require('../model/listaFilme');
const tabelaFilmes = require('../model/filme');

module.exports = {
    async getPerfilPage(req, res)
    {
        const nomeUser = req.params.nomeUser;
        const id = req.params.id;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        console.log(usuario)

        console.log(usuario[0].DtNasc)
        
        const dataNascimento = new Date(usuario[0].DtNasc);
    
        dataNascimento.setDate(dataNascimento.getDate() + 2);

        usuario[0].DtNasc = dataNascimento.toLocaleDateString('pt-BR');

        console.log(usuario[0].IDUsuario)
        

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
        
        const filmes = await tabelaListaFilme.findAll({
            raw: true,
            include: [{model: tabelaFilmes}],
            where: {IDUsuario: usuario[0].IDUsuario}
        });

        console.log(filmes)
        
        res.render('../views/perfil', {usuario, filmes, lista, IDSFilmes});
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