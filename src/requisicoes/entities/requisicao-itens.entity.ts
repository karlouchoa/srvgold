export class RequisicaoItem {
  id: bigint;
  uuid: string;
  id_requisicao: bigint;
  id_item: bigint;
  quantidade: number;
  unidade?: string;
  status?: string;
  observacao?: string;
  created_at?: Date;
  updated_at?: Date;
}
