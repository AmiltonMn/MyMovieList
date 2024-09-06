/*
Comando para instalar o NODE.JS com tudo que é necessário para rodar o site 
npm init -y
npm install express mssql sequelize nodemon ejs
npm install multer
*/
const newImage = document.getElementById('newImage');
const userImage = document.getElementById('novaImagemPerfil');

const mode = localStorage;

function adicionarMode() {
    const html = document.getElementById("html");
    html.setAttribute("data-bs-theme", mode.getItem("mode"));
    updateIcone();
}

function mudarDarkMode(){
    mode.setItem("mode", (localStorage.getItem("mode") == "white") ? "dark" : "white");
    adicionarMode();
};

function updateIcone(){
    const iconeMode = document.getElementById("icone");
    iconeMode.innerText = (mode.getItem("mode") == "white") ? "dark_mode" : "light_mode";
}

function imgClick()
{
    newImage.click();
}

newImage.addEventListener('change', () =>
{
    if(newImage.files.length == 0)
    {
        return 0;
    }
    let reader = new FileReader();
    reader.readAsDataURL(newImage.files[0]);
    reader.onload = () => 
    (
        userImage.src = reader.result
    )
});

function listaFilmesClick(){
    document.getElementById("listaSeries").setAttribute("class", "collapse");
    document.getElementById("listaFilmes").setAttribute("class", "collapse show");
}

function listaSeriesClick(){
    document.getElementById("listaFilmes").setAttribute("class", "collapse");
    document.getElementById("listaSeries").setAttribute("class", "collapse show");
}