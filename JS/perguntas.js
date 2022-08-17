let acertos = 0, erros = 0;
let perguntaAtualID = 1;
let numeroQ = localStorage.getItem("numeroQ");
localStorage.removeItem("numeroQ");
var perguntas = PegarPerguntas();
const processedNums = [];
let perguntaAtual = NewNumber();

const botao = document.querySelector('#botaoEnviar');

function PegarPerguntas(){
    let bufferStorage = JSON.parse(localStorage.getItem('StorageQuests'));
    if(bufferStorage == null || numeroQ == null){
        alert('Nenhuma Pergunta Cadastrada');
        location = './index.html';
        return [];
    }
    return bufferStorage;
}

function MostrarPergunta(){
    document.querySelector('#perguntal').innerHTML = "PERGUNTA " + (perguntaAtualID);
    document.querySelector('#enunciado').innerHTML = perguntas[perguntaAtual].enunciado;
    let Respostas = "<ul>";
    for(let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++){
    let numeroResposta = i+1;
    Respostas += 
    `
    <li>
        <input type="checkbox" class="resposta" id="opt${numeroResposta-1}">
        <label for="opt${numeroResposta-1}" id="respostaLabel${numeroResposta-1}" class="unselectable">${numeroResposta}. ${perguntas[perguntaAtual].opcoes[i]}</label>
    </li>
    `;
    }
    Respostas += "</ul>";
    document.querySelector('#respostas').innerHTML = Respostas;
}
MostrarPergunta();

let checkBoxes = document.querySelectorAll('.resposta');

const UmaCheckBox = function(){
    checkBoxes.forEach(function(canto){
        canto.addEventListener('change', function(e) {
            if(e.target.checked)
            {
                checkBoxes.forEach(function(x){
                    x.checked = false;
                });
                e.target.checked = true;
            }
        });
    })
};
UmaCheckBox();


function ConfirmarResposta(){
    checkBoxes = document.querySelectorAll('.resposta');
    checkBoxes.forEach(function(caixa, index)
    {
        if(caixa.checked)
        {
            if(index == perguntas[perguntaAtual].indexCerto)
            {
                acertos++;
                 document.querySelector(('#respostaLabel'+index)).style.backgroundColor = 'green';
            }
            else 
            {
                erros++; 
                document.querySelector(('#respostaLabel'+index)).style.backgroundColor = 'red';
                document.querySelector(('#respostaLabel'+perguntas[perguntaAtual].indexCerto)).style.backgroundColor = 'green';
            }
            if(perguntaAtualID == numeroQ){
            botao.setAttribute('onclick', 'MandarResultados()');
            botao.textContent = "Ver Resualtados";
            }
            else{
            botao.setAttribute('onclick', 'ProximaPergunta()');
            botao.textContent = "Proxima Pergunta";
            checkBoxes.forEach(function(ped){
                ped.setAttribute('disabled', true);
            });
            }   
        }
    });
   
    
}

function ProximaPergunta(){
    perguntaAtual = NewNumber();
    perguntaAtualID ++;
    botao.setAttribute('onclick', 'ConfirmarResposta()');
    botao.textContent = "CONFIRM";
    MostrarPergunta();
    checkBoxes = document.querySelectorAll('.resposta');
    UmaCheckBox();
}

function MandarResultados()
{
    sessionStorage.setItem('acertos', acertos);
    sessionStorage.setItem('erros', erros);
    location = './resultado.html';
}

function NewNumber()
{
    let buffer;
    do{
        buffer = Math.floor(Math.random()*numeroQ +1);
    }
    while(processedNums.includes(buffer));
    processedNums.push(buffer);
    return buffer;
}