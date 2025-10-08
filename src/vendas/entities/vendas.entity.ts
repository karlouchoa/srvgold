export class Vendas {
  id_venda: bigint;
  uuid: string;
  id_empresa: bigint;
  numero: number;
  id_cliente: bigint;
  id_vendedor?: bigint;
  data_emissao: Date;
  status?: string;
  observacoes?: string;
  desconto_perc?: number;
  desconto_valor?: number;
  total_produtos?: number;
  total_venda?: number;
  total_nf?: number;
  criado_em?: Date;
  atualizado_em?: Date;
  isdeleted?: boolean;
}
