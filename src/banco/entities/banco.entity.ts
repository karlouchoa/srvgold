export class Banco {
  id: bigint;
  uuid: string;
  codigo: string;
  nome: string;
  bloqueia_venda_sn?: boolean;
  digital_sn?: boolean;
  ativo_sn?: boolean;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
