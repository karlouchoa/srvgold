import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterVendasDto {
  @IsOptional() @IsNumber() id_empresa?: number;
  @IsOptional() @IsNumber() id_cliente?: number;
  @IsOptional() @IsNumber() numero?: number;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() data_inicio?: string;
  @IsOptional() @IsString() data_fim?: string;
}
