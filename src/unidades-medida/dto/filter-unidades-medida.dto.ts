import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterUnidadesMedidaDto {
  @IsOptional() @IsString() sigla?: string;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
