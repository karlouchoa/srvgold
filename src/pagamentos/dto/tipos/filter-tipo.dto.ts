// src/pagamentos/dto/tipos/filter-tipo.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';
export class FilterTipoDto {
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsString() categoria?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
