import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterItensDto {
  @IsOptional()
  @IsNumber()
  id_empresa?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
