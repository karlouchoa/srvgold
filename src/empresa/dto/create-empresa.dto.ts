import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  razao_social: string;

  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsOptional()
  @IsString()
  nome_curto?: string;

  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  inscricao_estadual?: string;

  @IsOptional()
  @IsString()
  inscricao_municipal?: string;

  @IsOptional()
  @IsString()
  suframa?: string;

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsNumber()
  id_cidade?: number;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  site?: string;

  @IsOptional()
  @IsString()
  responsavel?: string;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
