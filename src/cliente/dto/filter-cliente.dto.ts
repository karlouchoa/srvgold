import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterClienteDto {
  @IsOptional()
  @IsNumber()
  id_empresa?: number;

  @IsOptional()
  @IsString()
  nome_razao?: string;

  @IsOptional()
  @IsString()
  cpf_cnpj?: string;

  @IsOptional()
  @IsBoolean()
  ativo_sn?: boolean;
}
