const startButton = document.querySelector('#iniciar');
const cadastrarButton = document.querySelector('#cadastrar');
const pergunta = document.querySelector("#pergunta");
const inputN = document.querySelector("#inputN");
localStorage.removeItem("numeroQ");
let buttonClosed = true;

const bufferLocal = localStorage.getItem("StorageQuests");
const StorageQuests = (typeof bufferLocal) == 'string' ? JSON.parse(bufferLocal) : []; 

startButton.addEventListener('click', function(){
    if(buttonClosed)
    {
        inputN.style.display = 'inline';  
        startButton.style.marginTop = '0px';
        buttonClosed = false;
    }
    else if(inputN.value != 0)
    {
        pergunta.style.paddingTop = '1vh';
        pergunta.style.paddingBottom = '1vh';
        localStorage.setItem("numeroQ", inputN.value);
        setTimeout(function(){location = './perguntas.html';}, 1000)
    }
    else{
        alert("Insira um número de questões");
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

inputN.addEventListener('change', function(e){
    if(Number(inputN.value) > StorageQuests.length  || Number(inputN.value) <= 0){
         inputN.value = '';
    }
});