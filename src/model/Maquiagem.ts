import { Produto } from "./Produto";

export class Maquiagem extends Produto {
    private _textura: string;

    constructor(id: number, nome: string, tipo: number, preco: number, textura: string) {
        super(id, nome, tipo, preco);
        this._textura = textura;
    }

    public get textura(): string { return this._textura; }
    public set textura(value: string) { this._textura = value; }

    public visualizar(): void {
        super.visualizar();
        console.log(`Textura: ${this._textura}`);
    }
}