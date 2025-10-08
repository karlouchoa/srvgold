import { IsOptional, IsString, IsNumber } from 'class-validator';

export class BancoContaDto {
  @IsOptional()
  @IsString()
  cnpj_conta?: string;

  @IsOptional()
  @IsString()
  agencia?: string;

  @IsOptional()
  @IsString()
  digito_agencia?: string;

  @IsString()
  conta: string;

  @IsOptional()
  @IsString()
  digito_conta?: string;

  @IsOptional()
  @IsString()
  contabil?: string;

  @IsOptional()
  @IsNumber()
  lote?: number;

  @IsOptional()
  @IsNumber()
  limite_banco?: number;

  @IsOptional()
  @IsNumber()
  cbhost?: number;
}
