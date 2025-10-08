export class RetornoTitulos {
  id: bigint;
  uuid: string;
  id_retorno: bigint;
  id_titulo?: bigint;
  nosso_numero?: string;
  ocorrencia?: string;
  motivo?: string;
  valor_pago?: number;
  data_baixa?: Date;
}
