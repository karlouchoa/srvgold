// src/pagamentos/entities/tipos-pagamento.entity.ts
export class TiposPagamento {
  id_tipo: bigint;
  uuid: string;
  descricao: string;
  categoria: string;
  taxa_adm?: number;
  gera_comissao?: boolean;
  exige_senha?: boolean;
  integra_tef?: boolean;
  pix?: boolean;
  ativo?: boolean;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
