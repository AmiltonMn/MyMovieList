/*
Comando para instalar o NODE.JS com tudo que é necessário para rodar o site 
npm init -y
npm install express mssql sequelize nodemon ejs 
*/
const titulo = document.getElementById('tituloNav')

function mudarTitulo()
{
    titulo.innerHTML = "MML"
}

function voltarTitulo()
{
    titulo.innerHTML = "My Movie List"
}