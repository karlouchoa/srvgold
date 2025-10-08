export class VendaItensTributos {
  id_item_tributo: bigint;
  id_item_venda: bigint;
  cst?: string;
  cfop?: string;
  base_icms?: number;
  valor_icms?: number;
  base_st?: number;
  valor_st?: number;
  valor_ipi?: number;
  valor_pis?: number;
  valor_cofins?: number;
}
