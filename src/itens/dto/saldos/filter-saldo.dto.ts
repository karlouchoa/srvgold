import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FilterSaldoDto {
  @IsOptional()
  @IsNumber()
  id_empresa?: number;

  @IsOptional()
  @IsNumber()
  id_item?: number;

  @IsOptional()
  @IsString()
  endereco?: string;
}
