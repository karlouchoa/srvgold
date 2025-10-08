// src/pagamentos/dto/parcelas/filter-parcela.dto.ts
import { IsOptional, IsNumber } from 'class-validator';
export class FilterParcelaDto {
  @IsOptional() @IsNumber() id_forma?: number;
  @IsOptional() @IsNumber() ordem?: number;
}
