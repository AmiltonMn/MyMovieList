/*
Comando para instalar o NODE.JS com tudo que é necessário para rodar o site 
npm init -y
npm install express mssql sequelize nodemon ejs
npm install multer
*/

let range = document.querySelector("#notaInput");
let resultado = document.getElementById("resultado");

function mostrarNota (nota) {
    resultado.innerHTML = nota;
}