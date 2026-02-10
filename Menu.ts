import { Input } from "./src/util/Input";
import { Cosmetico } from "./src/model/Cosmetico";
import { Maquiagem } from "./src/model/Maquiagem";
import { Medicamento } from "./src/model/Medicamento";

const batom = new Cosmetico(1, "Batom Matte Passoia", 1, 45.90,"Floral" );
batom.visualizar();

const perfume = new Cosmetico(2, "Perfume Libre", 1, 580.00, "Floral");

const base = new Maquiagem(3, "Base True Match", 1, 89.90, "Líquida");

const shampoo = new Medicamento(1, "Shampoo Hidratante", 2, 89.90, "Pós-Química");

shampoo.visualizar();
perfume.visualizar();
base.visualizar();

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
                keyPress();
                break;
            case 2:
                console.log("\nListar Produto pelo ID\n");
                keyPress();
                break;
            case 3:
                console.log("\nCadastrar Produto\n");
                keyPress();
                break;
            case 4:
                console.log("\nAtualizar Produto\n");
                keyPress();
                break;
            case 5:
                console.log("\nDeletar Produto\n");
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