import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSaldoDto {
  @IsNumber()
  id_empresa: number;

  @IsNumber()
  id_item: number;

  @IsNumber()
  saldo: number;

  @IsOptional()
  @IsNumber()
  est_min?: number;

  @IsOptional()
  @IsString()
  endereco?: string;
}
