export class RequisicaoEstoque {
  id_req: bigint;
  uuid: string;
  id_empresa: bigint;
  id_ordem: bigint;
  numero?: string;
  data_emissao?: Date;
  status?: string;
  observacoes?: string;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
