const tabelaUsuario = require('../model/usuario');
const tabelaListaFilme = require('../model/listaFilme');
const tabelaFilmes = require('../model/filme');

module.exports = {
    async getPerfilPage(req, res)
    {
        const nomeUser = req.params.nomeUser;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
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
        
        const filmes = await tabelaListaFilme.findAll({
            raw: true,
            include: [{model: tabelaFilmes}],
            where: {IDUsuario: usuario[0].IDUsuario}
        });
        
        res.render('../views/perfil', {usuario, filmes, lista, flag: 0});
    },

        async atualizarPerfil(req, res){
            const dados = req.body;
            const nomeUser = req.params.nomeUser;

            console.log(nomeUser)

            let imagemPerfil = 'noImage.png'

            if (req.file) {
                imagemPerfil = req.file.filename;
            }
            
            await tabelaUsuario.update({
                Usuario: dados.usuarioInput,
                Nome: dados.nomeInput,
                DtNasc: dados.dtNascInput,
                Senha: dados.senhaInput,
                Email: dados.emailInput,
                Imagem: imagemPerfil
        },
        {
            where: { Usuario: nomeUser }
        });

        res.redirect('/perfil/' + dados.usuarioInput);
    },

    async deletarReview(req, res)
    {
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        let flag = 0;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        })

        try {
            await tabelaListaFilme.destroy({
                where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
            })
            flag = 1;
        } catch (error) {
            flag = 2;
        }

        const filmes = await tabelaListaFilme.findAll({
            raw: true,
            include: [{model: tabelaFilmes}],
            where: {IDUsuario: usuario[0].IDUsuario}
        });

        const lista = await tabelaListaFilme.findAll({
            raw: true,
            where: {IDUsuario: usuario[0].IDUsuario}
        })

        res.render('../views/perfil', {id, usuario, flag, filmes, lista})
    }
}