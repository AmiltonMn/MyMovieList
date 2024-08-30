const tabelaAmizade = require('../model/amizade');
const tabelaElencoFilme = require('../model/elencoFilme');
const tabelaElencoSerie = require('../model/elencoSerie');
const tabelaFilme = require('../model/filme');
const tabelaListaFilme = require('../model/listaFilme');
const tabelaListaSerie = require('../model/listaSerie');
const tabelaPretendeAssistirFilme = require('../model/pretendeAssistirFilme');
const tabelaPretendeAssistirSerie = require('../model/pretendeAssistirSerie');
const tabelaReclamacao = require('../model/reclamacao');
const tabelaSerie = require('../model/serie');
const tabelaTemporada = require('../model/temporada');
const tabelaUsuario = require('../model/usuario');
const tabelaEp = require('../model/ep');
const tabelaPessoa = require('../model/pessoa');

module.exports = {
    async getHome(req, res){

        await tabelaAmizade
        await tabelaElencoFilme
        await tabelaElencoSerie
        await tabelaEp
        await tabelaFilme
        await tabelaListaFilme
        await tabelaListaSerie
        await tabelaPessoa
        await tabelaPretendeAssistirFilme
        await tabelaPretendeAssistirSerie
        await tabelaReclamacao
        await tabelaSerie
        await tabelaTemporada
        await tabelaUsuario

        try {
            const nomeUser = req.params.nomeUser;

            const usuario = await tabelaUsuario.findAll({
                raw: true,
                attributes: ['IDUsuario', 'Usuario', 'Nome', 'DtNasc', 'Senha', 'Email', 'ISAdmin', 'Imagem'],
                where: {Usuario: nomeUser}
            });
            res.render('../views/home', {usuario});
        } catch (error) {
            res.render('../views/home', {usuario: []});
        }
    }
}