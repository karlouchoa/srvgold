export class Usuarios {
  id_usuario: bigint;
  uuid: string;
  id_empresa: bigint;
  login: string;
  senha_hash: string;
  nome: string;
  email?: string;
  telefone?: string;
  ativo?: boolean;
  administrador?: boolean;
  created_at?: Date;
  updated_at?: Date;
  isdeleted?: boolean;
}
