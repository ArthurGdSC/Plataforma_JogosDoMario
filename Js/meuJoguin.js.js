let velocidade_movimento = 30;
let gravidade = 0.5;
let personagem = document.querySelector('.personagem');
let img = document.getElementById('personagem-1');
let props_personagem = personagem.getBoundingClientRect();
let plano_fundo = document.querySelector('.background').getBoundingClientRect();
let mensagem = document.querySelector('.message');
let plano_fundo_original = getComputedStyle(mensagem).background;
let estado_jogo = 'Inicio';
let personagem_selecionado = 'img/personagem.png';


var sound1 = new Audio('music/super_mario_theme_song.mp3');

mensagem.style.width = '1100px';
mensagem.style.height = '600px';
mensagem.style.background = plano_fundo_original;
img.style.display = 'none';
mensagem.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && estado_jogo !== 'Jogar') {
    document.querySelectorAll('.pipe_sprite').forEach((e) => {
      e.remove();
    });
    img.style.display = 'block';
    personagem.style.top = '40vh';
    estado_jogo = 'Jogar';
    mensagem.innerHTML = '';
    mensagem.classList.remove('messageStyle');
    mensagem.style.background = plano_fundo_original;
    jogar();
    sound1.play();
  }
});

function jogar() {
  let pulando = false;
  let dy_personagem = 0;

  function mover() {
    if (estado_jogo !== 'Jogar') return;

    let sprites_tubos = document.querySelectorAll('.pipe_sprite');
    sprites_tubos.forEach((elemento) => {
      let props_tubo = elemento.getBoundingClientRect();
      props_personagem = personagem.getBoundingClientRect();

      if (props_tubo.right <= 0) {
        elemento.remove();
      } else {
        if (verificarColisao(props_personagem, props_tubo)) {
          estado_jogo = 'Fim';
          mensagem.style.left = '28vw';
          window.location.reload();
          mensagem.classList.remove('messageStyle');
          return;
        } else {
          if (
            props_tubo.right < props_personagem.left &&
            props_tubo.right + velocidade_movimento >= props_personagem.left &&
            elemento.increase_score == '1'
          ) {
          }
          elemento.style.left = props_tubo.left - velocidade_movimento + 'px';
        }
      }
    });
    requestAnimationFrame(mover);
  }
  requestAnimationFrame(mover);

  function aplicar_gravidade() {
    if (estado_jogo !== 'Jogar') return;
    dy_personagem = dy_personagem + gravidade;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === ' ') {
        if (!pulando) {
          pulando = true;
          img.src = personagem_selecionado;
          dy_personagem = -7.6;
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp' || e.key === ' ') {
        pulando = false;
        img.src = personagem_selecionado;
      }
    });

    if (props_personagem.top <= 0 || props_personagem.bottom >= plano_fundo.bottom) {
      estado_jogo = 'Fim';
      mensagem.style.left = '28vw';
      window.location.reload();
      mensagem.classList.remove('messageStyle');
      return;
    }
    personagem.style.top = props_personagem.top + dy_personagem + 'px';
    props_personagem = personagem.getBoundingClientRect();
    requestAnimationFrame(aplicar_gravidade);
  }
  requestAnimationFrame(aplicar_gravidade);

  let separacao_tubos = 0;
  let espaco_tubos = 35;

  function criar_tubo() {
    if (estado_jogo !== 'Jogar') return;

    if (separacao_tubos > 115) {
      separacao_tubos = 0;

      let posicao_tubo = Math.floor(Math.random() * 43) + 8;
      let sprite_tubo_invertido = document.createElement('div');
      sprite_tubo_invertido.className = 'pipe_sprite';
      sprite_tubo_invertido.style.top = posicao_tubo - 70 + 'vh';
      sprite_tubo_invertido.style.left = '100vw';

      document.body.appendChild(sprite_tubo_invertido);
      let sprite_tubo = document.createElement('div');
      sprite_tubo.className = 'pipe_sprite';
      sprite_tubo.style.top = posicao_tubo + espaco_tubos + 'vh';
      sprite_tubo.style.left = '100vw';
      sprite_tubo.increase_score = '1';

      document.body.appendChild(sprite_tubo);
    }
    separacao_tubos++;
    requestAnimationFrame(criar_tubo);
  }
  requestAnimationFrame(criar_tubo);
}

let entradas_radio = document.querySelectorAll('input[name="personagem"]');

entradas_radio.forEach((entrada) => {
  entrada.addEventListener('change', (e) => {
    if (entrada.checked) {
      personagem_selecionado = entrada.value;
      img.src = personagem_selecionado;
    }
  });
});

function verificarColisao(propsPersonagem, propsTubo) {
  return (
    propsPersonagem.right > propsTubo.left &&
    propsPersonagem.left < propsTubo.right &&
    propsPersonagem.bottom > propsTubo.top &&
    propsPersonagem.top < propsTubo.bottom
  );
}


var teste;
var escolha11;
var escolha21;
var escolha31;
var imagemSelecionada = false;

function funcaoTeste(parametroID, escolha1, escolha2, escolha3) {
  imagemSelecionada = true
  teste = parametroID;
  escolha11 = escolha1;
  escolha21 = escolha2;
  escolha31 = escolha3;
  console.log(teste)

  if (imagemSelecionada) {
    document.getElementById(`${teste}`).style.width = '230px'
    document.getElementById(`${escolha11}`).style.width = '80px' 
    document.getElementById(`${escolha21}`).style.width = '80px' 
    document.getElementById(`${escolha31}`).style.width = '80px' 
    imagemSelecionada = false
  } else if (imagemSelecionada = false) {
    document.getElementById(`${teste}`).style.width = '80%'
  }
}
