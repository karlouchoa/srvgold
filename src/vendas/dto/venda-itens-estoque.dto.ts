import { IsOptional, IsString, IsNumber } from 'class-validator';

export class VendaItensEstoqueDto {
  @IsOptional() @IsNumber() id_item_estoque?: number;
  @IsOptional() @IsString() lote?: string;
  @IsOptional() @IsString() numero_serie?: string;
  @IsOptional() @IsNumber() peso_bruto?: number;
  @IsOptional() @IsNumber() peso_liquido?: number;
  @IsOptional() @IsString() local_estoque?: string;
}
