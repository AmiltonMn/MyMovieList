/*
Comando para instalar o NODE.JS com tudo que é necessário para rodar o site 
npm init -y
npm install express mssql sequelize nodemon ejs
npm install multer
*/

const newImage = document.getElementById('newImage');
const userImage = document.getElementById('novaImagemPerfil');
const novaImagemFilme = document.getElementById('novaImagemFilme');
const ImagemFilme = document.getElementById('imagemFilme');

const mode = localStorage;

function adicionarMode() {
    const html = document.getElementById("html");
    html.setAttribute("data-bs-theme", mode.getItem("mode"));
    updateIcone();
}

function mudarDarkMode(){
    mode.setItem("mode", (localStorage.getItem("mode") == "dark") ? "white" : "dark");
    adicionarMode();
};

function updateIcone(){
    const iconeMode = document.getElementById("icone");
    iconeMode.innerText = (mode.getItem("mode") == "dark") ? "light_mode" : "dark_mode";
}

function imgClick()
{
    newImage.click();
}

function imgFilmeClick()
{
    novaImagemFilme.click()
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

novaImagemFilme.addEventListener('change', () =>
    {
        if(novaImagemFilme.files.length == 0)
        {
            return 0;
        }
    
        let reader = new FileReader();
        reader.readAsDataURL(novaImagemFilme.files[0]);
        reader.onload = () => 
        (
            console.log(novaImagemFilme.files[0]),
            ImagemFilme.src = reader.result
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

function listaFilmesAssistidosClick(){
    document.getElementById("filmesPretendoAssistir").setAttribute("class", "collapse");
    document.getElementById("filmesAssistidos").setAttribute("class", "collapse show");
}

function listaFilmesPretendoAssistirClick(){
    document.getElementById("filmesAssistidos").setAttribute("class", "collapse");
    document.getElementById("filmesPretendoAssistir").setAttribute("class", "collapse show");
}

function listaSeriesAssistidosClick(){
    document.getElementById("seriesPretendoAssistir").setAttribute("class", "collapse");
    document.getElementById("seriesAssistidos").setAttribute("class", "collapse show");
}

function listaSeriesPretendoAssistirClick(){
    document.getElementById("seriesAssistidos").setAttribute("class", "collapse");
    document.getElementById("seriesPretendoAssistir").setAttribute("class", "collapse show");
}