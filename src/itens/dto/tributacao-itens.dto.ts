import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class TributacaoItensDto {
  @IsNumber()
  id_item: number;

  @IsOptional()
  @IsNumber()
  id_cst?: number;

  @IsOptional()
  @IsNumber()
  id_clasfis?: number;

  @IsOptional()
  @IsNumber()
  perc_ipi?: number;

  @IsOptional()
  @IsNumber()
  perc_icms?: number;

  @IsOptional()
  @IsNumber()
  perc_pis?: number;

  @IsOptional()
  @IsNumber()
  perc_cofins?: number;

  @IsOptional()
  @IsBoolean()
  reducao_base?: boolean;
}
