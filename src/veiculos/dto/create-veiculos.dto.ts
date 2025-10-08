import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateVeiculosDto {
  @IsNumber()
  id_empresa: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  placa: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsNumber()
  ano?: number;

  @IsOptional()
  @IsNumber()
  capacidade?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
