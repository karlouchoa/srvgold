// src/pagamentos/entities/formas-pagamento.entity.ts
export class FormasPagamento {
  id_forma: bigint;
  uuid: string;
  descricao: string;
  id_tipo: bigint;
  ativo?: boolean;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
