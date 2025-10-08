import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateUnidadesMedidaDto {
  @IsString()
  sigla: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsNumber()
  fator_base?: number;

  @IsOptional()
  @IsNumber()
  unidade_base?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
