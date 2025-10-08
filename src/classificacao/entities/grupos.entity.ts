// grupos.entity.ts
export class Grupos {
  id_grupo: bigint;
  uuid: string;
  descricao: string;
  perc_comissao?: number;
  ativo?: boolean;
  aliq_icms?: number;
  reducao_icms?: number;
  comissao_linha?: number;
  data_alteracao?: Date;
}
