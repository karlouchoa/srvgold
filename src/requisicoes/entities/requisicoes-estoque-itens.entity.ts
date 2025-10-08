export class RequisicaoEstoqueItem {
  id_req_item: bigint;
  uuid: string;
  id_req: bigint;
  id_item: bigint;
  quantidade: number;
  quantidade_atendida?: number;
  unidade?: string;
  custo_unit?: number;
  custo_total?: number;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
  id_unidade?: bigint;
}
