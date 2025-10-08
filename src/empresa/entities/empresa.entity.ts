export class Empresa {
  id: bigint;
  uuid: string;
  razao_social: string;
  nome_fantasia?: string;
  nome_curto?: string;
  cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  suframa?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  id_cidade?: bigint;
  complemento?: string;
  telefone?: string;
  celular?: string;
  whatsapp?: string;
  email?: string;
  site?: string;
  responsavel?: string;
  isdeleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
