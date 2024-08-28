module.exports = {

    async getLoginPage(req, res){
        res.render('../views/login')
    },

    async postLoginPage(req, res){
        // Adicionar verificação se existe o usuario
        res.redirect('/');
    }
}