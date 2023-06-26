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
      console.log(action);
    })
    .catch((err) => console.log(err));
}
