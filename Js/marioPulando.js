const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
var sound1 = new Audio('music/super_mario_theme_song.mp3');
var sound2 = new Audio('music/mario-game-over.mp3');

function myFunction() {
  sound1.play();
}

const jump = () => {
  mario.classList.add('jump');
  sound1.play();
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const gameOver = () => {
  pipe.style.animation = 'none';
  mario.style.animation = 'none';
  mario.src = 'img/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  sound1.pause();
  sound2.play();

  // Exibe um alerta ao jogador
  const playAgain = confirm('Você perdeu! Deseja jogar novamente?');

  if (playAgain) {
    // Reinicia o site (recarrega a página)
    location.reload();
  }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    clearInterval(loop);
    gameOver();
  }
}, 10);

document.addEventListener('keydown', jump);
