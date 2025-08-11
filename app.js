const listaAmigos = [];
const listaAmigosUl = document.getElementById("listaAmigos");
const resultadoUl = document.getElementById("resultado");

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Por favor, digite um nome válido.");
    return;
  }

  if (listaAmigos.includes(nome)) {
    alert("Esse nome já foi adicionado.");
    input.value = "";
    return;
  }

  listaAmigos.push(nome);
  input.value = "";
  atualizarLista();
  limparResultado();
}

function atualizarLista() {
  listaAmigosUl.innerHTML = "";

  listaAmigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    listaAmigosUl.appendChild(li);
  });
}

function limparResultado() {
  resultadoUl.innerHTML = "";
}

function sortearAmigo() {
  if (listaAmigos.length < 1) {
    alert("Adicione pelo menos duas pessoas para sortear.");
    return;
  }

  // Cria um array para armazenar os pares (amigo -> amigo secreto)
  const sorteio = new Map();
  const nomesDisponiveis = [...listaAmigos];

  for (const amigo of listaAmigos) {
    // Filtra nomes disponíveis que não sejam o próprio amigo
    const opcoes = nomesDisponiveis.filter(nome => nome !== amigo);

    if (opcoes.length === 0) {
      // Se não houver opções, o sorteio falhou (por exemplo, último amigo só tem ele mesmo)
      alert("Não foi possível sortear sem que alguém tire o próprio nome. Tente novamente.");
      return;
    }

    // Escolhe aleatoriamente um nome das opções
    const escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];

    sorteio.set(amigo, escolhido);

    // Remove o escolhido da lista de disponíveis
    const indexRemover = nomesDisponiveis.indexOf(escolhido);
    nomesDisponiveis.splice(indexRemover, 1);
  }

  mostrarResultado(sorteio);
}

function mostrarResultado(sorteio) {
  resultadoUl.innerHTML = "";

  sorteio.forEach((amigoSecreto, amigo) => {
    const li = document.createElement("li");
    li.textContent = `${amigo} tirou ${amigoSecreto}`;
    resultadoUl.appendChild(li);
  });
}
