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
const lancamentos = document.getElementById('lancamentos');

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
    document.getElementById("botaoListaSeries").setAttribute("class", "btn btn-outline-primary d-flex align-items-end justify-content-center fs-2");
    document.getElementById("botaoListaFilmes").setAttribute("class", "btn btn-primary d-flex align-items-end justify-content-center fs-2");
}

function listaSeriesClick(){
    document.getElementById("listaFilmes").setAttribute("class", "collapse");
    document.getElementById("listaSeries").setAttribute("class", "collapse show");
    document.getElementById("botaoListaFilmes").setAttribute("class", "btn btn-outline-primary d-flex align-items-end justify-content-center fs-2");
    document.getElementById("botaoListaSeries").setAttribute("class", "btn btn-primary d-flex align-items-end justify-content-center fs-2");
}

function listaFilmesAssistidosClick(){
    document.getElementById("filmesPretendoAssistir").setAttribute("class", "collapse");
    document.getElementById("filmesAssistidos").setAttribute("class", "collapse show");
    document.getElementById("botaoPretendoAssistirFilmes").setAttribute("class", "btn btn-outline-primary");
    document.getElementById("botaoAssistidosFilmes").setAttribute("class", "btn btn-primary");
}

function listaFilmesPretendoAssistirClick(){
    document.getElementById("filmesAssistidos").setAttribute("class", "collapse");
    document.getElementById("filmesPretendoAssistir").setAttribute("class", "collapse show");
    document.getElementById("botaoAssistidosFilmes").setAttribute("class", "btn btn-outline-primary");
    document.getElementById("botaoPretendoAssistirFilmes").setAttribute("class", "btn btn-primary");
}

function listaSeriesAssistidosClick(){
    document.getElementById("seriesPretendoAssistir").setAttribute("class", "collapse");
    document.getElementById("seriesAssistidos").setAttribute("class", "collapse show");
    document.getElementById("botaoPretendoAssistirSeries").setAttribute("class", "btn btn-outline-primary");
    document.getElementById("botaoAssistidosSeries").setAttribute("class", "btn btn-primary");
}

function listaSeriesPretendoAssistirClick(){
    document.getElementById("seriesAssistidos").setAttribute("class", "collapse");
    document.getElementById("seriesPretendoAssistir").setAttribute("class", "collapse show");
    document.getElementById("botaoAssistidosSeries").setAttribute("class", "btn btn-outline-primary");
    document.getElementById("botaoPretendoAssistirSeries").setAttribute("class", "btn btn-primary");
}