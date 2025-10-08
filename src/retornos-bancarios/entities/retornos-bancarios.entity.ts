export class RetornosBancarios {
  id: bigint;
  uuid: string;
  id_empresa: bigint;
  banco?: string;
  data?: Date;
  arquivo_nome?: string;
  qtd_titulos?: number;
  valor_total?: number;
  created_at?: Date;
}
