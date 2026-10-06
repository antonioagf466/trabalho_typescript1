import { IItemCardapio, IPedido } from "./tipos";

export function calcularTotal(pedido: IPedido, descontoPercentual?: number): number {
  // Regra: pedido cancelado sempre retorna 0
  if (pedido.status === "cancelado") {
    return 0;
  }

  const subtotal: number = pedido.itens.reduce(
    (soma: number, item: IItemCardapio) => soma + item.preco,
    0
  );

  // Sem desconto informado: retorna o subtotal
  if (descontoPercentual === undefined) {
    return Number(subtotal.toFixed(2));
  }

  // Validação do cupom: precisa ser um número entre 0 e 100
  if (Number.isNaN(descontoPercentual) || descontoPercentual < 0 || descontoPercentual > 100) {
    console.error(
      `Erro: desconto inválido (${descontoPercentual}%). O desconto deve estar entre 0 e 100. Total calculado sem desconto.`
    );
    return Number(subtotal.toFixed(2));
  }

  const total: number = subtotal - subtotal * (descontoPercentual / 100);
  return Number(total.toFixed(2));
}

export function adicionarItem(pedido: IPedido, novoItem: IItemCardapio): void {
  if (pedido.status === "pago" || pedido.status === "cancelado") {
    console.error(
      `Erro: não é possível adicionar "${novoItem.nome}" ao pedido #${pedido.id}, pois ele está com status "${pedido.status}".`
    );
    return;
  }

  pedido.itens.push(novoItem);
  console.log(`Item "${novoItem.nome}" adicionado ao pedido #${pedido.id}.`);
}