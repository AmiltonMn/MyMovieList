const tabelaUsuario = require('../model/usuario');
const tabelaListaFilmes = require('../model/listaFilme');
const tabelaFilmes = require('../model/filme');
const { raw } = require('express');

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
        
        const lista = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDUsuario: usuario[0].IDUsuario}
        })
        
        const listaIDFilmes = await tabelaListaFilmes.findAll({
            raw: true,
            attributes: ['IDFilme'],
            where: {IDUsuario: usuario[0].IDUsuario}
        })
        
        let IDSFilmes = [];
        
        for (let i = 0; i < listaIDFilmes.length; i++) 
        {
            IDSFilmes[i] = listaIDFilmes[i].IDFilme;
        }
        
        const filmes = await tabelaListaFilmes.findAll({
            raw: true,
            include: [{model: tabelaFilmes}],
            where: {IDUsuario: usuario[0].IDUsuario}
        });
        
        res.render('../views/perfil', {usuario, filmes, lista, flag: 0});
    },

        async atualizarPerfil(req, res){

            const dados = req.body;
            const nomeUser = req.params.nomeUser;

            const usuario = await tabelaUsuario.findAll({
                raw: true,
                where: {Usuario: nomeUser}
            })

            let novaImagem = usuario[0].Imagem;

            console.log(novaImagem)

            if (req.file) {
                novaImagem = req.file.filename;
            }

            await tabelaUsuario.update({
                Usuario: dados.usuarioInput,
                Nome: dados.nomeInput,
                DtNasc: dados.dtNascInput,
                Senha: dados.senhaInput,
                Email: dados.emailInput,
                Imagem: novaImagem
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
            await tabelaListaFilmes.destroy({
                where: {IDFilme: id, IDUsuario: usuario[0].IDUsuario}
            })
            flag = 1;
        } catch (error) {
            flag = 2;
        }

        const notas = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        let notaFilme = 0;

        for (let i = 0; i < notas.length; i++) {
            notaFilme += notas[i].Nota;
            console.log(notas[i].Nota)
            console.log(notaFilme)
        };

        if (notas.length == 0) {
            notaFilme = 0;
        } else {
            notaFilme = notaFilme / notas.length;
        }

        await tabelaFilmes.update({
        NotaGeral: notaFilme
        },
        {
            where: {IDFilme: id}
        });

        const filmes = await tabelaListaFilmes.findAll({
            raw: true,
            include: [{model: tabelaFilmes}],
            where: {IDUsuario: usuario[0].IDUsuario}
        });

        const lista = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDUsuario: usuario[0].IDUsuario}
        })

        res.render('../views/perfil', {id, usuario, flag, filmes, lista})
    },

    async updateReview(req, res){
        const id = req.params.id;
        const nomeUser = req.params.nomeUser;
        const dados = req.body;

        const usuario = await tabelaUsuario.findAll({
            raw: true,
            where: {Usuario: nomeUser}
        });

        await tabelaListaFilmes.update({
            Comentario: dados.novoComentario,
            Nota: dados.novaNota,
        },
        {
            where: {IDUsuario: usuario[0].IDUsuario, IDFilme: id}   
        })

        const notas = await tabelaListaFilmes.findAll({
            raw: true,
            where: {IDFilme: id}
        });

        let notaFilme = 0;

        for (let i = 0; i < notas.length; i++) {
            notaFilme += notas[i].Nota;
        };

        notaFilme = notaFilme / notas.length;

        await tabelaFilmes.update({
        NotaGeral: notaFilme
        },
        {
            where: {IDFilme: id}
        });

        res.redirect('/perfil/' + nomeUser)
    }
}