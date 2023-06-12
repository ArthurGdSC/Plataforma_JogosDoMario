function gerarNumero() {
  var input1 = document.getElementById("caixa1").value;
  var input2 = document.getElementById("caixa2").value;
  var resultadoElement = document.getElementById("resultado");
  
  // Verifica se ambos os inputs estão preenchidos
  if (input1.trim() === "" || input2.trim() === "") {
   alert("Preencha todos os campos para ver a sua química com outra pessoa!!!")
    return; // Sai da função se os inputs não estiverem preenchidos
  }
  
  var numero = Math.floor(Math.random() * 101); // Gera um número aleatório entre 0 e 100
  document.getElementById("numero").textContent = numero + "%";

  if (numero <= 30) {
    resultadoElement.textContent = "Não é o seu amor    :-(";
  } else if (numero <= 70) {
    resultadoElement.textContent = "Talvez seja seu amor.";
  } else if (numero < 80) {
    resultadoElement.textContent = "Vai dar certo.";
  } else {
    resultadoElement.textContent = "É o amor da sua vida!!";
  }
}
