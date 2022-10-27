function createCalculator() {
  return {
    display: document.querySelector('.display'),
    // função que inicia a calculadora adicionando os eventos nela.
    start() {
      this.clickButtons();
      this.pressEnter();
    },

    // adiciona evento de keyup do no display, e quando for enter executa o metodo de realizar a conta
    pressEnter() {
      this.display.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          this.accountResult();
        }
      });
    },
    // define o valor do display como vazio
    clearDisplay() {
      this.display.value = ' ';
    },

    // faz um slice com -1 remove o ultimo valor adicionado ao display.
    delLastNumber() {
      this.display.value = this.display.value.slice(0, -1);
    },
    // seleciona o valor do display e realiza a conta com o eval()
    accountResult() {
      let account = this.display.value;

      try {
        account = eval(account);
        // se o valor do display for diferente de account, como letras ou simbolos indesejados vai exibir um alerta.
        if (!account) {
          alert('Conta invalida');
          return;
        }
        this.display.value = account;
      } catch (e) {
        alert('Conta invalida');
        return;
      }
    },

    // essas funções sao chaves do objeto, sempre que quero referenciar ela preciso do this
    // this -> calculadora
    clickButtons() {
      // quem chamou a função é o this
      document.addEventListener('click', (e) => {
        //el seleciona o elemento clicado
        const el = e.target;

        if (el.classList.contains('btn-num')) {
          // passado o innerText do elemento clicado como argumento para a função
          this.btnToDisplay(el.innerText);
        }
        // executa o metodo clearDisplay para voltar o display para o valor vazio
        if (el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }
        // realiza o slice excluindo o ultimo valor do display
        if (el.classList.contains('btn-del')) {
          this.delLastNumber();
        }
        // realiza a conta
        if (el.classList.contains('btn-eq')) {
          this.accountResult();
        }
      });
    },
    // recebe o innertText passado como argumento para concatenar e aparecer no display
    btnToDisplay(value) {
      //concatena o display com o innerText do botão clicado
      this.display.value += value;
    },
  };
}

const calculator = createCalculator();
calculator.start();
