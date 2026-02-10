import { Input } from "./src/util/Input";
import { ProdutoController } from "./src/controller/ProdutoController";
import { Cosmetico } from "./src/model/Cosmetico";
import { Maquiagem } from "./src/model/Maquiagem";
import { Medicamento } from "./src/model/Medicamento";

const produtos = new ProdutoController();

produtos.cadastrar(new Cosmetico(produtos.gerarId(), "Batom Matte Passoia", 1, 45.9, "Floral"));
produtos.cadastrar(new Cosmetico(produtos.gerarId(), "Perfume Libre", 1, 580.0, "Floral"));
produtos.cadastrar(new Maquiagem(produtos.gerarId(), "Base True Match", 1, 89.9, "Liquida"));
produtos.cadastrar(new Medicamento(produtos.gerarId(), "Shampoo Hidratante", 2, 89.90, "Pos-Quimica"));

export function main() {
    let opcao: number;

    while (true) {
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("                  PASSOIA E-COMMERCE                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("            1 - Listar todos os Produtos             ");
        console.log("            2 - Listar Produto pelo ID                ");
        console.log("            3 - Cadastrar Produto                    ");
        console.log("            4 - Atualizar Produto                    ");
        console.log("            5 - Deletar Produto                      ");
        console.log("            0 - Sair                                 ");
        console.log("*****************************************************");

        console.log("\nEntre com a opcao desejada:");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log("\nPassoia - Beleza que inspira!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log("\n*****************************************************");
                console.log("             LISTAR TODOS OS PRODUTOS                ");
                console.log("*****************************************************\n");
                produtos.listarTodos();
                keyPress();
                break;

            case 2:
                console.log("\n*****************************************************");
                console.log("               CONSULTAR PRODUTO                     ");
                console.log("*****************************************************\n");
                let idBusca = Input.questionInt("Digite o ID: ");
                let prod = produtos.buscarNoArray(idBusca);

                if (prod !== null) {
                    prod.visualizar();

                    console.log("\n[CARRINHO] Deseja comprar este item? (S/N)");
                    if (Input.question("").toUpperCase() === "S") {
                        
                        console.log("\n--- LOGISTICA ---");
                        console.log("1 - Entrega (+ R$ 15.00)");
                        console.log("2 - Retirada na Loja (Gratis)");
                        let opFrete = Input.questionInt("Opcao: ");
                        let frete = (opFrete === 1) ? 15.0 : 0.0;

                        console.log("\n--- PAGAMENTO ---");
                        console.log("1 - PIX (5% de desconto)");
                        console.log("2 - Boleto");
                        let opPag = Input.questionInt("Opcao: ");

                        let subtotal = prod.preco + frete;
                        let total = (opPag === 1) ? subtotal * 0.95 : subtotal;

                        console.log("\n===============================");
                        console.log("       RECIBO PASSOIA          ");
                        console.log(` PRODUTO: ${prod.nome}`);
                        console.log(` ENVIO:   ${opFrete === 1 ? "Delivery" : "Balcao"}`);
                        console.log(` TOTAL:   R$ ${total.toFixed(2)}`);
                        console.log("===============================");

                        if (Input.question("\nConfirmar pagamento? (S/N): ").toUpperCase() === "S") {
                            console.log("\nPagamento aprovado! Deseja retirar do estoque? (S/N)");
                            if (Input.question("").toUpperCase() === "S") {
                                produtos.deletar(idBusca);
                                console.log("Estoque atualizado.");
                            }
                        }
                    }
                } else {
                    console.log("\nProduto nao encontrado.");
                }
                keyPress();
                break;

            case 3:
                console.log("\n*****************************************************");
                console.log("               CADASTRAR PRODUTO                     ");
                console.log("*****************************************************\n");

                let nome = Input.question("Nome do Produto: ");
                while (nome.length < 3) {
                    console.log("Erro: O nome deve ter pelo menos 3 caracteres.");
                    nome = Input.question("Nome do Produto: ");
                }

                let preco = Input.questionFloat("Preco: R$ ");
                while (preco <= 0) {
                    console.log("Erro: O preco deve ser maior que zero.");
                    preco = Input.questionFloat("Preco: R$ ");
                }

                console.log("Tipo: 1-Cosmetico | 2-Medicamento");
                let tipo = Input.questionInt("Opcao: ");

                if (tipo === 1) {
                    let fragrancia = Input.question("Fragrancia: ");
                    produtos.cadastrar(new Cosmetico(produtos.gerarId(), nome, tipo, preco, fragrancia));
                } else if (tipo === 2) {
                    let tarja = Input.question("Tarja (ex: Branca/Amarela): ");
                    produtos.cadastrar(new Medicamento(produtos.gerarId(), nome, tipo, preco, tarja));
                } else {
                    console.log("\n[!] Tipo invalido. Cadastro cancelado.");
                }
                keyPress();
                break;

            case 4:
                console.log("\n*****************************************************");
                console.log("               ATUALIZAR PRODUTO                     ");
                console.log("*****************************************************\n");
                let idAt = Input.questionInt("Digite o ID: ");
                let prodEx = produtos.buscarNoArray(idAt);

                if (prodEx !== null) {
                    console.log("Deixe vazio para manter o valor atual.");
                    
                    let novoNome = Input.question(`Nome (${prodEx.nome}): `);
                    if (novoNome === "") novoNome = prodEx.nome;

                    let inPreco = Input.question(`Preco (${prodEx.preco}): `);
                    let novoPreco = inPreco === "" ? prodEx.preco : parseFloat(inPreco);

                    if (prodEx.tipo === 1) {
                        let fAt = (prodEx as Cosmetico).fragrancia;
                        let novaF = Input.question(`Fragrancia (${fAt}): `);
                        if (novaF === "") novaF = fAt;
                        produtos.atualizar(new Cosmetico(idAt, novoNome, prodEx.tipo, novoPreco, novaF));
                    } else {
                        let tAt = (prodEx as Medicamento).tarja;
                        let novaT = Input.question(`Tarja (${tAt}): `);
                        if (novaT === "") novaT = tAt;
                        produtos.atualizar(new Medicamento(idAt, novoNome, prodEx.tipo, novoPreco, novaT));
                    }
                } else {
                    console.log("\nProduto nao encontrado!");
                }
                keyPress();
                break;

            case 5:
                console.log("\n*****************************************************");
                console.log("                DELETAR PRODUTO                      ");
                console.log("*****************************************************\n");
                let idDel = Input.questionInt("Digite o ID que deseja deletar: ");
                produtos.deletar(idDel);
                keyPress();
                break;

            default:
                console.log("\nOpcao Invalida!\n");
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