export class SaldosItens {
  id_saldo: bigint;
  uuid: string;
  id_empresa: bigint;
  id_item: bigint;
  saldo: number;
  est_min?: number;
  endereco?: string;
  dt_ult_alt?: Date;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
