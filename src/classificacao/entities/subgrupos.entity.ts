// subgrupos.entity.ts
export class Subgrupos {
  id_subgrupo: bigint;
  uuid: string;
  id_grupo: bigint;
  descricao: string;
  identificador?: string;
  data_alteracao?: Date;
}
