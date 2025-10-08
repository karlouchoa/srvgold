import { IsString, IsOptional, IsNumber } from 'class-validator';

export class VendedoresComissaoDto {
  @IsString()
  tipo: string;

  @IsOptional()
  @IsNumber()
  percentual?: number;

  @IsOptional()
  @IsNumber()
  percentual_recebimento?: number;

  @IsOptional()
  @IsNumber()
  limite_desconto?: number;

  @IsOptional()
  @IsString()
  data_fim?: string;
}
