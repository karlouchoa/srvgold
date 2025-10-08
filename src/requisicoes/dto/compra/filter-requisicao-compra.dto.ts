import { IsOptional, IsString, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class FilterRequisicaoCompraDto {
  @IsOptional()
  @IsNumber()
  id_empresa?: number;

  @IsOptional()
  @IsNumber()
  id_usuario?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  prioridade?: string;

  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @IsOptional()
  @IsDateString()
  data_fim?: string;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
