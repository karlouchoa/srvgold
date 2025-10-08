import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class BancoBoletoConfigDto {
  @IsOptional()
  @IsString()
  carteira?: string;

  @IsOptional()
  @IsString()
  variacao_carteira?: string;

  @IsOptional()
  @IsString()
  cedente?: string;

  @IsOptional()
  @IsString()
  digito_cedente?: string;

  @IsOptional()
  @IsString()
  contrato?: string;

  @IsOptional()
  @IsBoolean()
  emite_boleto_sn?: boolean;

  @IsOptional()
  @IsNumber()
  numero_boleto?: number;

  @IsOptional()
  @IsNumber()
  taxa_emissao?: number;

  @IsOptional()
  @IsString()
  tipo_cobranca?: string;

  @IsOptional()
  @IsString()
  layout_arquivo?: string;

  @IsOptional()
  @IsString()
  codigo_transmissao?: string;
}
