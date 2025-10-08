export class VendedoresComissao {
  id_regra: bigint;
  id_vendedor: bigint;
  tipo: string;
  percentual?: number;
  percentual_recebimento?: number;
  limite_desconto?: number;
  data_inicio?: Date;
  data_fim?: Date;
}
