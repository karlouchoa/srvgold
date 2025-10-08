export class ClienteEndereco {
  id: bigint;
  uuid: string;
  id_cliente: bigint;
  tipo: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  id_cidade?: bigint;
  cep?: string;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
