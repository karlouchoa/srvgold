export class ItensBom {
  id_bom: bigint;
  uuid: string;
  id_empresa: bigint;
  id_item_pai: bigint;
  id_item_comp: bigint;
  qtd_por_un: number;
  und_pai?: string;
  und_comp?: string;
  ativo?: boolean;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
