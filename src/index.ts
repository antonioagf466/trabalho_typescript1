import { IItemCardapio, IPedido } from "./tipos";
import { adicionarItem, calcularTotal } from "./pedido";

// Cardápio
const refrigerante: IItemCardapio = { id: 1, nome: "Refrigerante", preco: 6.5, categoria: "bebida" };
const lasanha: IItemCardapio = { id: 2, nome: "Lasanha", preco: 42.9, categoria: "prato_principal" };
const pudim: IItemCardapio = { id: 3, nome: "Pudim", preco: 12.0, categoria: "sobremesa" };

// Pedidos
const pedidoAberto: IPedido = {
  id: 101,
  cliente: "Maria",
  itens: [lasanha],
  status: "aberto",
  observacoes: "Sem cebola",
};

const pedidoPago: IPedido = {
  id: 102,
  cliente: "João",
  itens: [refrigerante, lasanha],
  status: "pago",
};

const pedidoCancelado: IPedido = {
  id: 103,
  cliente: "Ana",
  itens: [lasanha, pudim],
  status: "cancelado",
};

// --- Testes adicionarItem ---
console.log("=== adicionarItem ===");
adicionarItem(pedidoAberto, refrigerante); // ok
adicionarItem(pedidoAberto, pudim);        // ok
adicionarItem(pedidoPago, pudim);          // erro
adicionarItem(pedidoCancelado, pudim);     // erro

// --- Testes calcularTotal ---
console.log("\n=== calcularTotal ===");
console.log("Pedido aberto sem desconto:", calcularTotal(pedidoAberto));       // 61.4
console.log("Pedido aberto com 10%:", calcularTotal(pedidoAberto, 10));        // 55.26
console.log("Pedido pago sem desconto:", calcularTotal(pedidoPago));           // 49.4
console.log("Pedido cancelado:", calcularTotal(pedidoCancelado, 10));          // 0
console.log("Cupom inválido (150%):", calcularTotal(pedidoAberto, 150));       // erro + 61.4
console.log("Cupom inválido (-5%):", calcularTotal(pedidoAberto, -5));         // erro + 61.4

// --- Exemplos que o TypeScript BLOQUEIA na compilação (descomente para testar) ---
// pedidoAberto.status = "pagoo";        // Erro: status digitado errado
// pedidoAberto.id = 999;                // Erro: id é readonly
// const x: IItemCardapio = { id: 4, nome: "Suco", preco: 8, categoria: "suco" }; // Erro: categoria inválida