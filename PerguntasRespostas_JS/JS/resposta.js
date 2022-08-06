const certas = document.querySelector('#Certas');
const erradas = document.querySelector('#Erradas');
const pa = document.querySelector('#PA');

const acertos = sessionStorage.getItem('acertos');
const erros = sessionStorage.getItem('erros');
const par = (Number(acertos) / (Number(acertos) + Number(erros))) * 100;

if(acertos == null) location = './index.html';

pa.textContent = 'PORCENTAGEM DE ACERTO: ' + par + '%';
certas.textContent = 'CERTAS: ' + acertos;
erradas.textContent = 'ERRADAS: ' + erros;

function TentarNovamente()
{
    sessionStorage.clear()
    location = './index.html'
}