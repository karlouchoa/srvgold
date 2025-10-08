import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class ItensBomDto {
  @IsNumber()
  id_item_comp: number;

  @IsNumber()
  qtd_por_un: number;

  @IsOptional()
  @IsString()
  und_pai?: string;

  @IsOptional()
  @IsString()
  und_comp?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
