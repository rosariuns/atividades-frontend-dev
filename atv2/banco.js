const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nome = "Nicoly Aguiar";
let agencia = "1234";
let numeroConta = "56789-0";
let saldo = 1000;

function perguntar(texto) {
    return new Promise((resolve) => {
        rl.question(texto, resolve);
    });
}

function mostrarMenu() {
    console.log("\n===== CAIXA ELETRÔNICO =====");
    console.log("1 - Consultar dados da conta");
    console.log("2 - Consultar saldo");
    console.log("3 - Realizar débito");
    console.log("4 - Realizar crédito");
    console.log("0 - Sair");
}

async function iniciar() {

    let opcao;

    do {
        mostrarMenu();

        opcao = await perguntar("\nEscolha uma opção: ");

        switch (opcao) {

            case "1":
                console.log("\n--- DADOS DA CONTA ---");
                console.log("Titular: " + nome);
                console.log("Agência: " + agencia);
                console.log("Conta: " + numeroConta);
                break;

            case "2":
                console.log("\nSaldo atual: " +
                    saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })
                );
                break;

            case "3":
                let valorDebito = parseFloat(
                    await perguntar("Digite o valor que deseja debitar: R$ ")
                );

                if (isNaN(valorDebito) || valorDebito <= 0) {
                    console.log("Valor inválido.");
                } else if (valorDebito > saldo) {
                    console.log("Saldo insuficiente.");
                } else {
                    saldo = saldo - valorDebito;
                    console.log("Débito realizado com sucesso.");

                    console.log(
                        "Novo saldo: " +
                        saldo.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })
                    );
                }
                break;

            case "4":
                let valorCredito = parseFloat(
                    await perguntar("Digite o valor que deseja creditar: R$ ")
                );

                if (isNaN(valorCredito) || valorCredito <= 0) {
                    console.log("Valor inválido.");
                } else {
                    saldo = saldo + valorCredito;
                    console.log("Crédito realizado com sucesso.");

                    console.log(
                        "Novo saldo: " +
                        saldo.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })
                    );
                }
                break;

            case "0":
                console.log("\nPrograma encerrado.");
                break;

            default:
                console.log("\nOpção inválida.");
        }

    } while (opcao !== "0");

    rl.close();
}

iniciar();