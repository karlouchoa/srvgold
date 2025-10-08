export class ClienteReferencia {
  id: bigint;
  uuid: string;
  id_cliente: bigint;
  tipo: string;
  descricao?: string;
  telefone?: string;
  observacao?: string;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
