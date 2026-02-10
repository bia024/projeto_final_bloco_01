export abstract class Produto {

    private _id: number;
    private _nome: string;
    private _preco: number;

    constructor(id: number, nome: string, preco: number) {
        this._id = id;
        this._nome = nome;
        this._preco = preco;
    }
// Método Set
    public get nome(): string {
        return this._nome;
    }

    public get preco(): number {
        return this._preco;
    }

    public get id(): number {
        return this._id;
    }

    
    public visualizar(): void {
        console.log("***************************");
        console.log("Dados do Produto");
        console.log("***************************");
        console.log(`ID: ${this._id}`);
        console.log(`Nome: ${this._nome}`);
        console.log(`Preço: R$ ${this._preco.toFixed(2)}`);
    }
}