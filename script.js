document.addEventListener("DOMContentLoaded", function () {

  // pega todas as tarefas
  const tarefas = document.querySelectorAll(".tarefa");
  // passa por cada tarefa
  tarefas.forEach(function (tarefa) {

    // quando clicar na tarefa
    tarefa.addEventListener("click", function () {

      // adiciona ou remove a classe "aberta"
      // essa classe controla a descrição no CSS
      tarefa.classList.toggle("aberta");

    });
  });

  // pega todos os quadrados (check)
  const checks = document.querySelectorAll(".check");

  // passa por cada quadrado
  checks.forEach(function (check) {

    // quando clicar no quadrado
    check.addEventListener("click", function (event) {

      // impede que o clique abra a descrição
      event.stopPropagation();

      // encontra a tarefa (li) mais próxima
      const tarefa = check.closest(".tarefa");

      // marca ou desmarca como concluída
      tarefa.classList.toggle("concluida");

    });

  });

});
