// Lista com 16 desafios divertidos e positivos para jovens
const desafios = [
  "Beba 2 copos de água agora e faça 10 polichinelos para se energizar! 💧⚡",
  "Mande uma mensagem carinhosa ou um elogio sincero para um(a) amigo(a) especial. 💌",
  "Ouça a sua música favorita e dance como se ninguém estivesse olhando durante 3 minutos! 🎧💃",
  "Aprenda e fale 5 palavras novas em um idioma diferente hoje! 🌍🗣️",
  "Desenhe ou faça um rascunho de algo que você gosta muito em apenas 2 minutos! 🎨✏️",
  "Desconecte das redes sociais por 1 hora inteira e aproveite para ler um livro ou relaxar! 📖🔕",
  "Faça um elogio sincero para alguém da sua família hoje! 🌟",
  "Organize um cantinho do seu quarto ou sua mesa de estudos que esteja precisando de ordem! 🧹✨",
  "Escreva em um papel 3 coisas pelas quais você é grato(a) no dia de hoje! 🙏📝",
  "Ajude alguém em casa com alguma tarefa sem que ninguém precise te pedir! 🙌🏠",
  "Tente aprender uma curiosidade científica ou fato divertido e conte para alguém hoje! 💡🚀",
  "Faça 1 minuto de respiração profunda e consciente para relaxar a mente. 🧘‍♂️✨",
  "Sorria verdadeiramente para as próximas 3 pessoas com quem você conversar hoje! 😊",
  "Crie uma playlist especial com 5 músicas animadas para quando precisar de motivação! 🎵🔥",
  "Saia para dar uma caminhada de 10 minutos e observe os detalhes da natureza ao seu redor! 🌿🚶‍♂️",
  "Escreva uma meta divertida que você quer alcançar até o final deste mês! 🎯✨"
];

document.addEventListener('DOMContentLoaded', () => {
  const inputNome = document.getElementById('nome-usuario');
  const btnSortear = document.getElementById('btn-sortear');
  const btnNovoDesafio = document.getElementById('btn-novo-desafio');
  const btnRecomecar = document.getElementById('btn-recomecar');
  const areaDesafio = document.getElementById('area-desafio');
  const contadorElemento = document.getElementById('contador');

  let totalDesafiosRealizados = 0;
  let ultimoIndice = -1;

  // Função principal para realizar o sorteio e incrementar o contador
  function sortearDesafio() {
    const nome = inputNome.value.trim();

    // Validação caso o usuário não tenha digitado o nome
    if (!nome) {
      inputNome.classList.add('input-erro');
      inputNome.focus();
      
      areaDesafio.className = 'area-desafio aviso';
      areaDesafio.innerHTML = '<p>Por favor, digite o seu nome no campo acima para sortear o desafio! 😊</p>';
      return;
    }

    // Limpa estado de erro no input
    inputNome.classList.remove('input-erro');

    // Seleciona um desafio aleatório garantindo não repetir o imediatamente anterior
    let indiceAleatorio;
    do {
      indiceAleatorio = Math.floor(Math.random() * desafios.length);
    } while (desafios.length > 1 && indiceAleatorio === ultimoIndice);

    ultimoIndice = indiceAleatorio;
    const desafioSorteado = desafios[indiceAleatorio];

    // Incrementa o contador de desafios realizados
    totalDesafiosRealizados++;
    contadorElemento.textContent = totalDesafiosRealizados;

    // Atualiza a área de desafio sem recarregar a página
    areaDesafio.className = 'area-desafio tem-resultado';
    areaDesafio.innerHTML = `
      <div class="resultado-container">
        <p class="desafio-saudacao">🎉 Olá, <span>${escaparHtml(nome)}</span>! Seu desafio é:</p>
        <p class="desafio-texto">"${desafioSorteado}"</p>
      </div>
    `;

    // Exibe os botões secundários abaixo do resultado
    btnNovoDesafio.classList.remove('oculto');
    btnRecomecar.classList.remove('oculto');
  }

  // Função para reiniciar a aplicação e voltar ao estado inicial
  function recomecar() {
    // Limpa o nome digitado
    inputNome.value = '';
    inputNome.classList.remove('input-erro');

    // Reseta o contador para 0
    totalDesafiosRealizados = 0;
    contadorElemento.textContent = '0';

    // Limpa a área do desafio
    areaDesafio.className = 'area-desafio';
    areaDesafio.innerHTML = '';

    // Esconde os botões de ação secundária
    btnNovoDesafio.classList.add('oculto');
    btnRecomecar.classList.add('oculto');

    // Foca novamente no campo de nome para facilidade de uso
    inputNome.focus();
  }

  // Função utilitária para evitar injeção de HTML no nome
  function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  // Evento de clique no botão principal "Sortear Desafio"
  btnSortear.addEventListener('click', sortearDesafio);

  // Evento de clique no botão "Novo Desafio"
  btnNovoDesafio.addEventListener('click', () => {
    sortearDesafio();
    areaDesafio.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Evento de clique no botão "Recomeçar"
  btnRecomecar.addEventListener('click', recomecar);

  // Evento de pressionar a tecla Enter no campo de nome
  inputNome.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sortearDesafio();
    }
  });

  // Remove o estilo de erro assim que o usuário digita no campo
  inputNome.addEventListener('input', () => {
    if (inputNome.value.trim() !== '') {
      inputNome.classList.remove('input-erro');
    }
  });
});
