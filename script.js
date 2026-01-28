document.addEventListener('DOMContentLoaded', () => {

  const listaContainer = document.getElementById('lista-tarefas-container');
  const avisoScroll = document.querySelector('.aviso-scroll');
  const mensagemVazia = document.querySelector('.lista-vazia');
  const form = document.getElementById('form-tarefa');
  const API_URL = 'https://api-to-do-list-ysxa.onrender.com'

  // GET — carregar tarefas
  function carregarTarefas() {
    fetch(`${API_URL}/tarefas`)
      .then(res => res.json())
      .then(tarefas => {
        listaContainer.innerHTML = '';

        if (tarefas.length === 0) {
          mensagemVazia.style.display = 'block';
          avisoScroll.style.display = 'none';
          return;
        }

        mensagemVazia.style.display = 'none';

        tarefas.forEach(tarefa => {
          const article = document.createElement('article');
          article.classList.add('tarefa');
          article.dataset.id = tarefa.id;

          if (tarefa.status === 'concluída') {
            article.classList.add('concluida');
          }

          article.innerHTML = `
            <button class="check" aria-label="Marcar como concluída"></button>

            <div class="conteudo">
              <h3 class="titulo">${tarefa.titulo}</h3>
              <p class="descricao">${tarefa.descricao || ''}</p>
            </div>

            <span class="categoria">
              ${tarefa.categoria?.nome || 'Sem categoria'}
            </span>

            <button class="excluir" aria-label="Excluir tarefa">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          `;

          listaContainer.appendChild(article);
        });

        // aviso de scroll
        avisoScroll.style.display = tarefas.length > 5 ? 'block' : 'none';
      })
      .catch(err => console.error('Erro no GET:', err));
  }

  carregarTarefas();

  // POST — criar tarefa
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const botao = form.querySelector('button');
    botao.disabled = true;

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const categoriaId = document.getElementById('categoria').value;

    fetch(`${API_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        descricao,
        status: 'a fazer',
        categoria_id: categoriaId || null
      })
    })
      .then(() => {
        carregarTarefas();
        form.reset();
        botao.disabled = false;
      })
      .catch(err => {
        console.error('Erro no POST:', err);
        botao.disabled = false;
      });
  });

  // ABRIR / FECHAR DESCRIÇÃO 
  listaContainer.addEventListener('click', (event) => {
    const tarefa = event.target.closest('.tarefa');
    if (!tarefa) return;

    // impede abrir ao clicar nos botões
    if (
      event.target.closest('.check') ||
      event.target.closest('.excluir')
    ) {
      return;
    }

    tarefa.classList.toggle('aberta');
  });

  // DELETE — excluir tarefa
  listaContainer.addEventListener('click', (event) => {
  const botaoExcluir = event.target.closest('.excluir');
  if (!botaoExcluir) return;

  event.stopPropagation();

  const tarefa = botaoExcluir.closest('.tarefa');
  const id = tarefa.dataset.id;

  if (!id) return;

  fetch(`${API_URL}/tarefas/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      carregarTarefas(); // atualiza a lista
    })
    .catch(err => console.error('Erro no DELETE:', err));
  });


  // PUT — marcar como concluída / pendente
  listaContainer.addEventListener('click', (event) => {
  const botaoCheck = event.target.closest('.check');
  if (!botaoCheck) return;

  event.stopPropagation();

  const tarefaElement = botaoCheck.closest('.tarefa');
  const tarefaId = tarefaElement.dataset.id;

  const estaConcluida = tarefaElement.classList.contains('concluida');

  const novoStatus = estaConcluida ? 'a fazer' : 'concluída';

  fetch(`${API_URL}/tarefas/${tarefaId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: novoStatus })
  })
    .then(() => {
      tarefaElement.classList.toggle('concluida');
    })
    .catch(err => console.error('Erro no PUT:', err));
});

});
