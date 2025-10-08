import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FilterEmpresaDto {
  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsOptional()
  @IsString()
  razao_social?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsNumberString()
  id_cidade?: string;
}
