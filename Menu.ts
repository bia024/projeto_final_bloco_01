import { Input } from "./src/util/Input";
import { ProdutoController } from "./src/controller/ProdutoController";
import { Cosmetico } from "./src/model/Cosmetico";
import { Maquiagem } from "./src/model/Maquiagem";
import { Medicamento } from "./src/model/Medicamento";

const produtos = new ProdutoController();

produtos.cadastrar(new Cosmetico(produtos.gerarId(), "Batom Matte Passoia", 1, 45.9, "Floral"));
produtos.cadastrar(new Cosmetico(produtos.gerarId(), "Perfume Libre", 1, 580.0, "Floral"));
produtos.cadastrar(new Maquiagem(produtos.gerarId(), "Base True Match", 1, 89.9, "Líquida"));
produtos.cadastrar(new Medicamento(produtos.gerarId(), "Shampoo Hidratante", 2, 89.90, "Pós-Química"));

console.log("\n *** Listagem de Produtos no Controller ***");
produtos.listarTodos();

console.log("\n*** Teste de Busca por ID ***");
produtos.procurarPorId(2);

console.log("\n*** Teste de Busca por ID ***");
produtos.procurarPorId(99);


export function main() {
    let opcao: number;

    while (true) {
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("                  PASSOIA E-COMMERCE                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Listar todos os Produtos             ");
        console.log("            2 - Listar Produto pelo ID                ");
        console.log("            3 - Cadastrar Produto                    ");
        console.log("            4 - Atualizar Produto                    ");
        console.log("            5 - Deletar Produto                      ");
        console.log("            0 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");

        console.log("\nEntre com a opção desejada:");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log("\nPassoia - Beleza que inspira!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log("\nListar todos os Produtos\n");
                produtos.listarTodos();
                keyPress();
                break;

            case 2:
                console.log("\nListar Produto pelo ID\n");
                console.log("Digite o ID do produto: ");
                let idBusca = Input.questionInt("");
                produtos.procurarPorId(idBusca);
                keyPress();
                break;

            case 3:
                console.log("\n*** Cadastrar Produto ***\n");
                console.log("Digite o Nome do Produto: ");
                let nomeCad = Input.question("");

                console.log("Digite o Preço do Produto: ");
                let precoCad = Input.questionFloat("");

                console.log("Digite o Tipo (1-Cosmético ou 2-Medicamento): ");
                let tipoCad = Input.questionInt("");

                switch (tipoCad) {
                    case 1:
                        console.log("Digite a Fragrância do Cosmético: ");
                        let fragrancia = Input.question("");
                        produtos.cadastrar(new Cosmetico(produtos.gerarId(), nomeCad, tipoCad, precoCad, fragrancia));
                        break;
                    case 2:
                        console.log("Digite a Tarja do Medicamento: ");
                        let tarja = Input.question("");
                        produtos.cadastrar(new Medicamento(produtos.gerarId(), nomeCad, tipoCad, precoCad, tarja));
                        break;
                    default:
                        console.log("\nTipo inválido!");
                }
                keyPress();
                break;

            case 4:
        console.log("\nAtualizar Produto\n");
        console.log("Digite o ID do produto para atualizar: ");
        let idAtualizar = Input.questionInt("");
        let produtoExistente = produtos.buscarNoArray(idAtualizar);

        if (produtoExistente !== null) {
          console.log("\nProduto encontrado! Deixe em branco para manter o valor atual.");
          console.log(`ID atual: ${produtoExistente.id}`);

          console.log(`Tipo atual: ${produtoExistente.tipo}`);

          console.log(`Nome atual: ${produtoExistente.nome}`);
          let novoNome = Input.question("Digite o novo nome: ");
          if (novoNome === "") novoNome = produtoExistente.nome;

          console.log(`Preço atual: ${produtoExistente.preco}`);
          let inputPreco = Input.question("Digite o novo preço: ");
          let novoPreco = inputPreco === "" ? produtoExistente.preco : parseFloat(inputPreco);

          let tipo = produtoExistente.tipo;

          if (tipo === 1) {
            let fragranciaAtual = (produtoExistente as Cosmetico).fragrancia;
            console.log(`Fragrância atual: ${fragranciaAtual}`);
            let novaFragrancia = Input.question("Digite a nova fragrância: ");
            if (novaFragrancia === "") novaFragrancia = fragranciaAtual;

            produtos.atualizar(new Cosmetico(idAtualizar, novoNome, tipo, novoPreco, novaFragrancia));
          } else if (tipo === 2) {
            let tarjaAtual = (produtoExistente as Medicamento).tarja;
            console.log(`Tarja atual: ${tarjaAtual}`);
            let novaTarja = Input.question("Digite a nova tarja: ");
            if (novaTarja === "") novaTarja = tarjaAtual;

            produtos.atualizar(new Medicamento(idAtualizar, novoNome, tipo, novoPreco, novaTarja));
          }

        } else {
          console.log("\nProduto não encontrado!");
        }
        keyPress();
        break;

            case 5:
                console.log("\nDeletar Produto\n");
                console.log("Digite o ID do produto que deseja deletar: ");
                let idDeletar = Input.questionInt("");
                produtos.deletar(idDeletar);
                keyPress();
                break;

            default:
                console.log("\nOpção Inválida!\n");
                keyPress();
        }
    }
}

function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Bianca Caetano - beahreis4@gmail.com");
    console.log("GitHub: github.com/bia024");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log("\nPressione enter para continuar...");
    Input.prompt();
}

main();