// familias.entity.ts
export class Familias {
  id_familia: bigint;
  uuid: string;
  id_subgrupo: bigint;
  descricao: string;
  identificador?: string;
  status?: string;
  data_alteracao?: Date;
}
