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
const tabelaGenero = require('../model/genero');
const tabelaGeneroFilme = require('../model/generoFilme');
const tabelaGeneroSerie = require('../model/generoFilme');
const { Op, or } = require('sequelize');
const filme = require('../model/filme');
const usuario = require('../model/usuario');


module.exports = {
    async getHomeInit(req, res){
        
        const filmesMaisRecentes = await tabelaFilme.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        });

        const filmesMelhorAvaliados = await tabelaFilme.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        });

        const seriesMaisRecentes = await tabelaSerie.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        });

        const seriesMelhorAvaliados = await tabelaSerie.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        });
        
        res.render('../views/home', {usuario: '', filmesMaisRecentes, filmesMelhorAvaliados, seriesMaisRecentes, seriesMelhorAvaliados});
    },

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
        await tabelaGenero
        await tabelaGeneroFilme
        await tabelaGeneroSerie

        const filmesMaisRecentes = await tabelaFilme.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        })

        const filmesMelhorAvaliados = await tabelaFilme.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        })

        const seriesMaisRecentes = await tabelaSerie.findAll ({
            raw: true,
            order: [['Lancamento', 'DESC']]
        });

        const seriesMelhorAvaliados = await tabelaSerie.findAll ({
            raw: true,
            order: [['NotaGeral', 'DESC']]
        });

        const nomeUser = req.params.nomeUser;

        if (typeof(nomeUser) === undefined || nomeUser == 'favicon.ico') {
            return 0;
        } else {
            
            if (nomeUser != '') {
                const usuario = await tabelaUsuario.findAll({
                    raw: true,
                    where: {Usuario: nomeUser}
                });
                res.render('../views/home', {usuario, filmesMaisRecentes, filmesMelhorAvaliados, seriesMaisRecentes, seriesMelhorAvaliados});
            } else {

            }
        }
    }
}