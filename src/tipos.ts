export type CategoriaItem = "bebida" | "prato_principal" | "sobremesa";

export type StatusPedido = "aberto" | "pago" | "cancelado";

export interface IItemCardapio {
  readonly id: number;
  nome: string;
  preco: number;
  categoria: CategoriaItem;
}

export interface IPedido {
  readonly id: number;
  cliente: string;
  itens: IItemCardapio[];
  status: StatusPedido;
  observacoes?: string;
}