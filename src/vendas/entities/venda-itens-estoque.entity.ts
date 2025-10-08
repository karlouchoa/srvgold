export class VendaItensEstoque {
  id_item_estoque: bigint;
  id_item_venda: bigint;
  lote?: string;
  numero_serie?: string;
  peso_bruto?: number;
  peso_liquido?: number;
  local_estoque?: string;
}
