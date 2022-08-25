const perguntas = ReceberPerguntas();
const enunciado = document.querySelector("#enunciado");
const ndp = document.querySelector("#NDP");
const containerOPT = document.querySelector("#containerOPT");
const resposta = document.querySelector("#Resposta");
const cadastrar = document.querySelector("#cadastrar");
localStorage.removeItem("numeroQ");
let nop = 0;

const bufferLocal = localStorage.getItem("StorageQuests");
const StorageQuests =
  typeof bufferLocal == "string" ? JSON.parse(bufferLocal) : [];

const Quest = function (enunciado, opcao, indexCerto) {
  this.enunciado = enunciado;
  this.opcoes = opcao;
  this.indexCerto = indexCerto;
};

ndp.addEventListener("change", function () {
  containerOPT.innerHTML = "";
  const number = Number(ndp.value);
  for (let i = 1; i <= number; i++) {
    const questions = document.createElement("div");
    questions.classList = "opcao";
    const label = document.createElement("label");
    const nome = "Opçao " + i;
    const input = document.createElement("input");
    label.innerText = nome;
    input.setAttribute("type", "text");
    input.classList = "opttext";
    questions.appendChild(label);
    questions.appendChild(input);
    containerOPT.appendChild(questions);
  }
  if (!(number == 0)) {
    resposta.setAttribute("max", number);
    resposta.setAttribute("min", 1);
  } else {
    resposta.setAttribute("max", 0);
    resposta.setAttribute("min", 0);
  }
});

cadastrar.addEventListener("click", function () {
  const bufferEnunciado = enunciado.value;
  const bufferOpt = Array.from(containerOPT.querySelectorAll(".opttext"));
  const optValues = bufferOpt.map(function (x) {
    return x.value;
  });
  const bufferIndex = resposta.value - 1;
  const bufferQuest = new Quest(bufferEnunciado, optValues, bufferIndex);
  console.log(optValues);
  console.log(bufferEnunciado);
  console.log(bufferIndex);
  if (!(bufferEnunciado == "" || optValues.includes("") || bufferIndex < 0)) {
    StorageQuests.push(bufferQuest);
    console.log(StorageQuests);
    localStorage.setItem("StorageQuests", JSON.stringify(StorageQuests));
    alert("Questao Cadastrada");
    CleanInputs();
  } else {
    alert("Erro");
  }
});

resposta.addEventListener("change", function (e) {
  if (
    Number(resposta.value) > Number(ndp.value) ||
    Number(resposta.value) <= 0
  ) {
    resposta.value = "";
    console.log(1);
  }
});

function ReceberPerguntas() {
  const bufferStorage = localStorage.getItem("quests");
  if (bufferStorage === null) {
    return [];
  } else {
    return JSON.parse(bufferStorage);
  }
}

function MandarPerguntas() {
  const bufferSend = JSON.stringify(perguntas);
  localStorage.setItem("quest", bufferSend);
}

function CleanInputs() {
  enunciado.value = "";
  resposta.value = "";
  ndp.value = "";
  containerOPT.innerHTML = "";
}
