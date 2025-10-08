import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CaixaDocumentosDto {
  @IsOptional()
  @IsNumber()
  id_tipo_pg?: number;

  @IsOptional()
  @IsString()
  numero_doc?: string;

  @IsOptional()
  @IsString()
  historico?: string;

  @IsNumber()
  valor: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  banco_id?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsDateString()
  data_lanc?: Date;
}
