export abstract class Produto {
  private _id: number;
  private _nome: string;
  private _tipo: number;
  private _preco: number;

  constructor(id: number, nome: string, tipo: number, preco: number) {
    this._id = id;
    this._nome = nome;
    this._tipo = tipo;
    this._preco = preco;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }

  public get tipo(): number {
    return this._tipo;
  }
  public set tipo(value: number) {
    this._tipo = value;
  }

  public get preco(): number {
    return this._preco;
  }
  public set preco(value: number) {
    this._preco = value;
  }

  public visualizar(): void {
    let tipo: string = "";

    switch (this._tipo) {
      case 1:
        tipo = "Cosmético";
        break;
      case 2:
        tipo = "Medicamento";
        break;
      default:
        tipo = "Não especificado";
        break;
    }

    console.log("***************************");
    console.log("Dados do Produto");
    console.log("***************************");
    console.log(`ID: ${this._id}`);
    console.log(`Nome: ${this._nome}`);
    console.log(`Tipo: ${tipo}`);
    console.log(
      `Preço: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(this._preco)}`,
    );
  }
}
