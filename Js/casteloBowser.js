let escolhaAnterior = "";
const historiaElement = document.getElementById("historia");

function escolhaA() {
  historiaElement.innerHTML = "<p>Você escolheu o caminho A.</p>";

  if (escolhaAnterior === "B") {
    historiaElement.innerHTML += "<p>Mario decide seguir o caminho alternativo, mas retorna para o caminho principal...</p>";
    escolhaAnterior = "";
  } else if (escolhaAnterior === "A") {
    historiaElement.innerHTML += "<p>Mario continua sua jornada para salvar a Princesa Peach...</p>";
  } else {
    historiaElement.innerHTML += "<p> Determinado a salvá-la, ele parte em uma jornada perigosa pelo Reino dos Cogumelos.</p>";
    escolhaAnterior = "A";
  }

  if (escolhaAnterior === "A") {
    historiaElement.innerHTML += "<p>Após enfrentar inimigos e superar obstáculos, Mario chega ao castelo de Bowser. Ele confronta o vilão em uma batalha emocionante e finalmente resgata a Princesa Peach, trazendo-a de volta ao Reino dos Cogumelos em segurança.</p>";
  }
}

function escolhaB() {
  historiaElement.innerHTML = "<p>Você escolheu o caminho B.</p>";

  if (escolhaAnterior === "A") {
    historiaElement.innerHTML += "<p>Mario decide seguir o caminho principal, mas retorna para o caminho alternativo...</p>";
    escolhaAnterior = "";
  } else if (escolhaAnterior === "B") {
    historiaElement.innerHTML += "<p>Mario continua sua jornada desafiadora para salvar a Princesa Peach...</p>";
  } else {
    historiaElement.innerHTML += "<p>Mario descobre um caminho alternativo cheio de perigos, mas que promete levá-lo mais rapidamente ao castelo de Bowser. Ele decide enfrentar os desafios adicionais em busca de resgatar a Princesa Peach.</p>";
    escolhaAnterior = "B";
  }

  if (escolhaAnterior === "B") {
    historiaElement.innerHTML += "<p>Mario utiliza suas habilidades e conta com a ajuda de aliados inesperados para superar os desafios do caminho alternativo. Ele chega ao castelo de Bowser antes do esperado e confronta o vilão em uma batalha épica. Ao derrotá-lo, Mario resgata a Princesa Peach e juntos eles retornam ao Reino dos Cogumelos como heróis.</p>";
  }
}


