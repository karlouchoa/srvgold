export class ClienteAssociado {
  id: bigint;
  uuid: string;
  id_cliente: bigint;
  matricula?: string;
  dt_admissao?: Date;
  sexo?: string;
  profissao?: string;
  pai?: string;
  mae?: string;
  conjuge?: string;
  renda_principal?: number;
  renda_complementar?: number;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
