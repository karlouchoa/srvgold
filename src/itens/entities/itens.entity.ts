export class Itens {
  id_item: bigint;
  uuid: string;
  id_empresa: bigint;
  id_fornecedor?: bigint;
  id_grupo?: bigint;
  id_subgrupo?: bigint;
  id_familia?: bigint;
  descricao: string;
  descricao_fat?: string;
  unidade_venda: string;
  marca?: string;
  qtde_embalagem?: number;
  peso_bruto?: number;
  peso_liquido?: number;
  ativo?: boolean;
  permite_negativo?: boolean;
  aceita_desconto?: boolean;
  servico?: boolean;
  data_cadastro?: Date;
  usuario_cadastro?: string;
  isdeleted?: boolean;
  id_unidade?: bigint;
}
