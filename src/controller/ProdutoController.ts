import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoController implements ProdutoRepository {

    private listaProdutos: Array<Produto> = new Array<Produto>();
    public id: number = 0;

    listarTodos(): void {
        for (let produto of this.listaProdutos) {
            produto.visualizar();
        }
    }

    public procurarPorId(id: number): void {
        const buscaProduto = this.buscarNoArray(id);

        if (buscaProduto !== null) {
            console.log("\nProduto encontrado: ");
            buscaProduto.visualizar();
        } else {
            console.log(`\nO produto com o ID: ${id} não foi encontrado!`);
        }
    }

    cadastrar(produto: Produto): void {
        this.listaProdutos.push(produto);
        console.log("\nProduto cadastrado com sucesso!");
    }

    atualizar(produto: Produto): void {
    let buscaProduto = this.buscarNoArray(produto.id);

    if (buscaProduto !== null) {
        let indice = this.listaProdutos.indexOf(buscaProduto);
        this.listaProdutos[indice] = produto;
        console.log("\nO Produto foi atualizado com sucesso!");
    } else {
        console.log("\nProduto não encontrado!");
    }
}

    deletar(id: number): void {
        const buscaProduto = this.buscarNoArray(id);

        if (buscaProduto !== null) {
            const indice = this.listaProdutos.indexOf(buscaProduto);
            this.listaProdutos.splice(indice, 1);
            console.log("\nO Produto foi deletado com sucesso!");
        } else {
            console.log("\nProduto não encontrado!");
        }
    }

    public gerarId(): number {
        return ++this.id;
    }

    public buscarNoArray(id: number): Produto | null {
        for (let produto of this.listaProdutos) {
            if (produto.id === id) {
                return produto;
            }
        }
        return null;
    }
}