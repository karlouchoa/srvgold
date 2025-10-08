import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CaixaPagamentosDto {
  @IsOptional()
  @IsNumber()
  id_venda?: number;

  @IsNumber()
  id_tipo_pg: number;

  @IsOptional()
  @IsNumber()
  id_forma_pg?: number;

  @IsNumber()
  valor: number;

  @IsOptional()
  @IsNumber()
  parcelas?: number;

  @IsOptional()
  @IsNumber()
  taxa?: number;

  @IsOptional()
  @IsNumber()
  valor_taxa?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsDateString()
  data_receb?: Date;

  @IsOptional()
  @IsString()
  usuario?: string;
}
