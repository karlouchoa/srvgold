export class VendaItens {
  id_item_venda: bigint;
  id_venda: bigint;
  id_item: bigint;
  quantidade: number;
  preco_unitario: number;
  desconto_perc?: number;
  desconto_valor?: number;
  total_item: number;
  custo_item?: number;
  created_at?: Date;
}
