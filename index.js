// modulos externos
const chalk = require('chalk');
const inquirer = require('inquirer');

// modulos internos
const fs = require('fs');

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action'];

      switch (action) {
        case 'Criar conta':
          createAccount();
        default:
          break;
      }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe. Escolha outro nome'),
        );

        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{ "balance": 0 }',
        function (err) {
          console.log(err);
        },
      );

      console.log(
        chalk.bgGreen.black('Parabéns! Sua conta foi criada com sucesso!'),
      );

      operation();
    })
    .catch((err) => console.log(err));
}
