const usuarios = require('../model/usuario');

module.exports = {
    async getFilmesPage(req, res){
        const id = req.params.id;

        const usuario = await usuarios.findByPk(id, {
            raw: true,
            attributes: ['IDUsuario', 'Usuario', 'Nome', 'Email', 'DtNasc', 'Imagem']
        })

        res.render('../views/filmes', {usuario});
    }
}