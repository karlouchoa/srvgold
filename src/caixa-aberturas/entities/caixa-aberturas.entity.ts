export class CaixaAberturas {
  id_caixa: bigint;
  uuid: string;
  id_empresa: bigint;
  id_usuario: bigint;
  data_abertura: Date;
  saldo_inicial?: number;
  data_fechamento?: Date;
  saldo_final?: number;
  ip_abertura?: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}
