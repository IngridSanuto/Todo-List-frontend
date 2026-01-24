document.addEventListener("DOMContentLoaded", function () {

  // pega elementos principais
  const lista = document.querySelector(".lista-tarefas");
  const mensagemVazia = document.querySelector(".lista-vazia");
  const avisoScroll = document.querySelector(".aviso-scroll");

  // pega todas as tarefas
  let tarefas = document.querySelectorAll(".tarefa");

  // FUNÇÃO SIMPLES DE VERIFICAÇÃO
  function verificarMensagens() {

    // atualiza a lista de tarefas
    tarefas = document.querySelectorAll(".tarefa");

    // lista vazia
    if (tarefas.length === 0) {
      mensagemVazia.style.display = "block";
    } else {
      mensagemVazia.style.display = "none";
    }

    // aviso de scroll
    if (tarefas.length > 5) {
      avisoScroll.style.display = "block";
    } else {
      avisoScroll.style.display = "none";
    }
  }

  // ABRIR / FECHAR DESCRIÇÃO
  tarefas.forEach(function (tarefa) {
    tarefa.addEventListener("click", function () {
      tarefa.classList.toggle("aberta");
    });
  });

  // MARCAR COMO CONCLUÍDA
  const checks = document.querySelectorAll(".check");

  checks.forEach(function (check) {
    check.addEventListener("click", function (event) {
      event.stopPropagation();

      const tarefa = check.closest(".tarefa");
      tarefa.classList.toggle("concluida");
    });
  });

  // EXCLUIR TAREFA
  const botoesExcluir = document.querySelectorAll(".excluir");

  botoesExcluir.forEach(function (botao) {
    botao.addEventListener("click", function (event) {
      event.stopPropagation();

      const tarefa = botao.closest(".tarefa");
      tarefa.remove();

      // verifica mensagens após excluir
      verificarMensagens();
    });
  });

  // verifica ao carregar a página
  verificarMensagens();

});
