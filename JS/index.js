const startButton = document.querySelector('#iniciar');
const cadastrarButton = document.querySelector('#cadastrar');
const pergunta = document.querySelector("#pergunta");
const inputN = document.querySelector("#inputN");
let buttonClosed = true;

startButton.addEventListener('click', function(){
    if(buttonClosed)
    {
        inputN.style.display = 'inline';  
        startButton.style.marginTop = '0px';
        buttonClosed = false;
    }
    else
    {
        pergunta.style.paddingTop = '1vh';
        pergunta.style.paddingBottom = '1vh';
        setTimeout(function(){location = './perguntas.html';}, 1000)
    }
});

document.addEventListener('DOMContentLoaded', function(){
    pergunta.style.transition = '1000ms'
    pergunta.style.paddingTop = '8vh';
    pergunta.style.paddingBottom = '8vh';
});

cadastrarButton.addEventListener('click', function(){
    pergunta.style.padding = '1vh';
    setTimeout(function(){location = './cadastrar.html';}, 1000)
});