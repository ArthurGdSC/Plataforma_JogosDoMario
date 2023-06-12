

const grade = document.querySelector('.cartas');

const personagens = [
'carta1',
'carta2',
'carta3',
'carta4',
'carta5',
'carta6',
'carta7',
'carta8',
'carta9',
'carta10',
];
const criarElemento = (tag, classe) => {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  return elemento;
}

let primeiraCarta = '';
let segundaCarta = '';


const verificarCartas = () => {
  const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
  const segundoPersonagem = segundaCarta.getAttribute('data-character');

  if (primeiroPersonagem === segundoPersonagem) {

    primeiraCarta.firstChild.classList.add('disabled-card');
    segundaCarta.firstChild.classList.add('disabled-card');

    primeiraCarta = '';
    segundaCarta = '';

    verificarFimDeJogo();

  } else {
    setTimeout(() => {

      primeiraCarta.classList.remove('reveal-card');
      segundaCarta.classList.remove('reveal-card');

      primeiraCarta = '';
      segundaCarta = '';

    }, 500);
  }

}

const revelarCarta = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (primeiraCarta === '') {

    target.parentNode.classList.add('reveal-card');
    primeiraCarta = target.parentNode;

  } else if (segundaCarta === '') {

    target.parentNode.classList.add('reveal-card');
    segundaCarta = target.parentNode;

    verificarCartas();

  }
}

const criarCarta = (personagem) => {

  const carta = criarElemento('div', 'card');
  const frente = criarElemento('div', 'face front');
  const verso = criarElemento('div', 'face back');

  frente.style.backgroundImage = `url('../img/cartas/${personagem}.png')`;

  carta.appendChild(frente);
  carta.appendChild(verso);

  carta.addEventListener('click', revelarCarta);
  carta.setAttribute('data-character', personagem)

  return carta;
}

const carregarJogo = () => {
  const personagensDuplicados = [...personagens, ...personagens];

  const arrayEmbaralhado = personagensDuplicados.sort(() => Math.random() - 0.5);

  arrayEmbaralhado.forEach((personagem) => {
    const carta = criarCarta(personagem);
    grade.appendChild(carta);
  });
}



window.onload = () => {
  carregarJogo();
}


// Código existente...

const verificarFimDeJogo = () => {
  const cartasDesabilitadas = document.querySelectorAll('.disabled-card');
  if (cartasDesabilitadas.length === personagens.length * 2) {
    setTimeout(() => {
      if (confirm('Parabéns! Você venceu o jogo! Deseja jogar novamente?')) {
        reiniciarSite();
      }
    }, 500);
  }
};

const reiniciarSite = () => {
  location.reload(); // Recarrega a página, similar a pressionar F5
};

// Função para carregar o jogo...

window.onload = () => {
  carregarJogo();
}
