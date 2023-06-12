alert("Controle o luigi com as setas, pule com o espaço e de pulo duplo apertando duas vezes o espaço.")
alert("Agora só pegar as moedas!!!")



// Criar o elemento de jogo
var tela = document.createElement("canvas");
var ctx = tela.getContext("2d");
tela.width = window.innerWidth;
tela.height = window.innerHeight;
document.body.appendChild(tela);

var imgMoeda = new Image();
imgMoeda.src = "../img/moeda.png";

var imgPlataforma = new Image();
imgPlataforma.src = "../img/brick-row.png";

var imgCubo = new Image();
imgCubo.src = "../img/luigiPegaMoeda.png";


var sound1 = new Audio('music/super_mario_theme_song.mp3');


// Definir constantes do jogo
var tamanhoCubo = 120;
var alturaPulo = 150;
var alturaPuloDuplo = 450;
var gravidade = 0.5;
var tamanhoMoeda = 48;
var quantidadeMoedas = 30;

// Definir estado do jogo
var cubo = {
  x: 20,
  y: tela.height - tamanhoCubo,
  vy: 0,
  pulando: false,
  contadorPulos: 0,
  ultimoTempoPulo: 0
};
var moedas = [];
var plataformas = [];
var pontuacao = 0;
var fimDeJogo = false;

// Função para criar moedas em posições aleatórias
function criarMoedas() {
  for (var i = 0; i < quantidadeMoedas; i++) {
    var x = Math.random() * (tela.width - tamanhoMoeda);
    var y = Math.random() * (tela.height - tamanhoMoeda);
    moedas.push({ x: x, y: y, coletada: false });
  }
}

// Função para criar plataformas
function criarPlataformas() {
  // Plataforma principal
  plataformas.push({ x: 0, y: tela.height - 20, largura: tela.width, altura: 20 });


  // Plataformas secundárias
  for (var i = 0; i < quantidadeMoedas; i++) {
    var moeda = moedas[i];
    var plataformaX = moeda.x + tamanhoMoeda / 10;
    var plataformaY = moeda.y + tamanhoMoeda + 10;
    var plataformaLargura = Math.random() * 100 + 80; // Largura aleatória entre 50 e 150
    var plataformaAltura = 45;
    plataformas.push({ x: plataformaX, y: plataformaY, largura: plataformaLargura, altura: plataformaAltura });
  }
}

// Função para atualizar a lógica do jogo
function atualizar() {
  if (!fimDeJogo) {
    // Atualizar posição do cubo de forma suave
    cubo.y += cubo.vy;
    cubo.vy += gravidade;
    if (cubo.y > tela.height - tamanhoCubo) {
      cubo.y = tela.height - tamanhoCubo;
      cubo.vy = 0;
      cubo.pulando = false;
      cubo.contadorPulos = 0;
    }

    // Verificar colisão do cubo com as plataformas
    for (var i = 0; i < plataformas.length; i++) {
      var plataforma = plataformas[i];
      if (
        cubo.x < plataforma.x + plataforma.largura &&
        cubo.x + tamanhoCubo > plataforma.x &&
        cubo.y + tamanhoCubo > plataforma.y &&
        cubo.y + tamanhoCubo < plataforma.y + plataforma.altura &&
        cubo.vy >= 0
      ) {
        cubo.y = plataforma.y - tamanhoCubo;
        cubo.vy = 0;
        cubo.pulando = false;
        cubo.contadorPulos = 0;
      }
    }

    // Verificar colisão do cubo com as moedas
    var todasMoedasColetadas = true; // Verificar se todas as moedas foram coletadas
    for (var i = 0; i < quantidadeMoedas; i++) {
      var moeda = moedas[i];
      if (!moeda.coletada) {
        todasMoedasColetadas = false;
        if (
          cubo.x < moeda.x + tamanhoMoeda &&
          cubo.x + tamanhoCubo > moeda.x &&
          cubo.y < moeda.y + tamanhoMoeda &&
          cubo.y + tamanhoCubo > moeda.y
        ) {
          moeda.coletada = true;
          pontuacao++;
        }
      }
    }

    // Verificar se todas as moedas foram coletadas
    if (todasMoedasColetadas) {
      fimDeJogo = true;
      // Exibir mensagem parabenizando e perguntando se deseja jogar novamente
      var jogarNovamente = confirm("Parabéns! Você coletou todas as moedas!\n\nDeseja jogar novamente?");
      if (jogarNovamente) {
        iniciarJogo(); // Reiniciar o jogo
      }
    }
  }
}

// Função para desenhar os elementos do jogo
function desenhar() {
    

  ctx.fillRect(0, 0, tela.width, tela.height);

  
  
 // Desenhar as plataformas
for (var i = 0; i < plataformas.length; i++) {
  var plataforma = plataformas[i];
  ctx.drawImage(imgPlataforma, plataforma.x, plataforma.y, plataforma.largura, plataforma.altura);
}


 // Desenhar o cubo
ctx.drawImage(imgCubo, cubo.x, cubo.y, tamanhoCubo, tamanhoCubo);

  
  // Desenhar as moedas
for (var i = 0; i < quantidadeMoedas; i++) {
  var moeda = moedas[i];
  if (!moeda.coletada) {
    ctx.drawImage(imgMoeda, moeda.x, moeda.y, tamanhoMoeda, tamanhoMoeda);
  }
}

  // Desenhar a pontuação
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Pontuação: " + pontuacao, 10, 20);
}

// Função para atualizar o jogo
function loopJogo() {
  atualizar();
  desenhar();
  requestAnimationFrame(loopJogo);
}

// Função para iniciar o jogo
function iniciarJogo() {
  cubo = { x: 50, y: tela.height - tamanhoCubo, vy: 0, pulando: false, contadorPulos: 0, ultimoTempoPulo: 0 };
  moedas = [];
  plataformas = [];
  pontuacao = 0;
  fimDeJogo = false;
  criarMoedas();
  criarPlataformas();
  loopJogo();
}

// Eventos de teclado
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37) {
    // Tecla de seta esquerda
    cubo.x -= 15; // Movimento mais suave
  } else if (event.keyCode === 39) {
    // Tecla de seta direita
    cubo.x += 15; // Movimento mais suave
  } else if (event.keyCode === 32) {

    sound1.play();
    // Tecla de espaço
    if (!cubo.pulando) {
      cubo.vy = -Math.sqrt(2 * alturaPulo * gravidade);
      cubo.pulando = true;
      cubo.contadorPulos = 1;
      cubo.ultimoTempoPulo = Date.now();
    } else if (cubo.contadorPulos === 1 && (Date.now() - cubo.ultimoTempoPulo) < 300) {
      cubo.vy = -Math.sqrt(2 * alturaPuloDuplo * gravidade);
      cubo.contadorPulos = 0;
    }
  } else if (event.keyCode === 13 && fimDeJogo) {
    // Tecla Enter
    iniciarJogo();
  }
});

// Iniciar o jogo
iniciarJogo();
