export class CaixaDocumentos {
  id_lancamento: bigint;
  uuid: string;
  id_caixa: bigint;
  id_tipo_pg?: bigint;
  numero_doc?: string;
  historico?: string;
  valor: number;
  status?: string;
  banco_id?: bigint;
  tipo?: string;
  usuario?: string;
  data_lanc?: Date;
  created_at?: Date;
  updated_at?: Date;
}
