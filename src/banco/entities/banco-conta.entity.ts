export class BancoConta {
  id: bigint;
  banco_id: bigint;
  cnpj_conta?: string;
  agencia?: string;
  digito_agencia?: string;
  conta: string;
  digito_conta?: string;
  contabil?: string;
  lote?: number;
  limite_banco?: number;
  cbhost?: number;
}
