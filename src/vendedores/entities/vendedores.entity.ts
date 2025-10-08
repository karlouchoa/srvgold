export class Vendedores {
  id_vendedor: bigint;
  uuid: string;
  id_empresa: bigint;
  nome: string;
  cpf?: string;
  setor?: string;
  email?: string;
  ramal?: string;
  ddd?: string;
  ativo?: boolean;
  todos_clientes?: boolean;
  nao_soma_faturamento?: boolean;
  imagem_perfil?: string;
  tipo?: string;
  created_at?: Date;
  updated_at?: Date;
  isdeleted?: boolean;
}
