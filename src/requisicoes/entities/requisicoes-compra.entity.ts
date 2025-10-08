export class RequisicaoCompra {
  id: bigint;
  uuid: string;
  id_empresa: bigint;
  id_usuario: bigint;
  data?: Date;
  status?: string;
  prioridade?: string;
  observacao?: string;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
