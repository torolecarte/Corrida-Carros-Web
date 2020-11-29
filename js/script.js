
var game;
var numeroCarrosCorrida = 4;
var carrosCorrida = [];

window.onload = function () {

  setCarrosCorrida();
  var btnIniciar = document.getElementById("btnIniciar");
  btnIniciar.addEventListener("click", function () {
    this.className = "ativado";
    setImagemCarroMovimento();
    game = setInterval(moveCarroImage, 100);
  });

};

function Carro(nome, velocidade, imagemInicioFileName, imagemMovimentoFileName) {
  this.elementId = nome;
  this.nome = nome;
  this.velocidade = velocidade;
  this.imagemInicioFileName = imagemInicioFileName;
  this.imagemMovimentoFileName = imagemMovimentoFileName;

  function setVelocidade(novaVelocidade) {
    this.velocidade = novaVelocidade;
  }
}

function setCarrosCorrida() {
  for (var i = 0; i < numeroCarrosCorrida; i++) {
    var carroNumero = i+1;
    carrosCorrida[i] = new Carro(`carro${carroNumero}`, randomizeVelocity(10, 20), `i_carro${carroNumero}.png`, `carro${carroNumero}.gif`);
  }
}

function setImagemCarroMovimento() {
  for (var i = 0; i < carrosCorrida.length; i++) {
    var carro = document.getElementById(carrosCorrida[i].elementId);
    carro.src = "images/" + carrosCorrida[i].imagemMovimentoFileName;
    carro.style.left = "0px";
  }
}

function setCarroOnMovement() {
  for (var i = 0; i < carrosCorrida.length; i++) {
    carrosCorrida[i].setVelocidade(randomizeVelocity(10, 20));
  }
}

function setCarroStopped() {
  for (var i = 0; i < carrosCorrida.length; i++) {
    var carro = document.getElementById(carrosCorrida[i].elementId);
    carro.src = "images/" + carrosCorrida[i].imagemInicioFileName;
  }
}

function randomizeVelocity(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function moveCarroImage() {
  for (var i = 0; i < carrosCorrida.length; i++) {
    var carro = document.getElementById(carrosCorrida[i].elementId);

    var currentLeftStyleInt = getIntValueFromStyle(carro.style.left);
    var leftStyleInPx = (currentLeftStyleInt + carrosCorrida[i].velocidade) + "px";

    carro.style.left = leftStyleInPx;

    currentLeftStyleInt = getIntValueFromStyle(carro.style.left);
    if (currentLeftStyleInt >= 660)
      finalizarCorrida(i);
  }
}

function getIntValueFromStyle(stringValue) {
  var value = parseInt(stringValue.substr(0, stringValue.indexOf("px")));
  return value;
}

function finalizarCorrida(carroVencedorIndice) {
  clearInterval(game);
  setCarroStopped();
  for (var i = 0; i < carrosCorrida.length; i++) {
    var carro = document.getElementById(carrosCorrida[i].elementId);
    if (i == carroVencedorIndice) {
      document.getElementById(`vencedor${carroVencedorIndice+1}`).innerHTML = 
        '<div class="vencedor"><img src="images/trofeu.png"> <p>Vencedor!</p> </div>'
    }
  }
}

