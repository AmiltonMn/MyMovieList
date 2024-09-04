/*
Comando para instalar o NODE.JS com tudo que é necessário para rodar o site 
npm init -y
npm install express mssql sequelize nodemon ejs
npm install multer
*/

const mode = localStorage;

function adicionarMode() {
    console.log("adicionarMode");
    const html = document.getElementById("html");
    html.setAttribute("data-bs-theme", mode.getItem("mode"));
    updateIcone();
}

function mudarDarkMode(){
    mode.setItem("mode", (localStorage.getItem("mode") == "white") ? "dark" : "white");
    const html = document.getElementById("html");
    html.setAttribute("data-bs-theme", mode.getItem("mode"));
    updateIcone();
};

function updateIcone(){
    const iconeMode = document.getElementById("icone");
    iconeMode.innerText = (mode.getItem("mode") == "white") ? "light_mode" : "dark_mode";
}