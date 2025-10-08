export class TributacaoItens {
  id_tributacao: bigint;
  uuid: string;
  id_item: bigint;
  id_cst?: bigint;
  id_clasfis?: bigint;
  perc_ipi?: number;
  perc_icms?: number;
  perc_pis?: number;
  perc_cofins?: number;
  reducao_base?: boolean;
  isdeleted?: boolean;
}
