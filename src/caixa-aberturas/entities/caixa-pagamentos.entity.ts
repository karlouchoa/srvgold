export class CaixaPagamentos {
  id_pagamento: bigint;
  uuid: string;
  id_caixa: bigint;
  id_venda?: bigint;
  id_tipo_pg: bigint;
  id_forma_pg?: bigint;
  valor: number;
  parcelas?: number;
  taxa?: number;
  valor_taxa?: number;
  tipo?: string;
  data_receb?: Date;
  usuario?: string;
  created_at?: Date;
  updated_at?: Date;
}
