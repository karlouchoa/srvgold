export class Veiculos {
  id_veiculo: bigint;
  uuid: string;
  id_empresa: bigint;
  descricao?: string;
  placa: string;
  modelo?: string;
  ano?: number;
  capacidade?: number;
  ativo?: boolean;
  created_at?: Date;
}
