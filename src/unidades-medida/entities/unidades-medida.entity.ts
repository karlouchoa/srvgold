export class UnidadesMedida {
  id_unidade: bigint;
  uuid: string;
  sigla: string;
  descricao: string;
  fator_base?: number;
  unidade_base?: bigint;
  ativo?: boolean;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
