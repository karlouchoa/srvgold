// src/pagamentos/dto/formas/filter-forma.dto.ts
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
export class FilterFormaDto {
  @IsOptional() @IsNumber() id_tipo?: number;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
