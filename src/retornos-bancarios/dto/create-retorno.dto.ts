import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRetornoDto {
  @IsNumber()
  id_empresa: number;

  @IsOptional() @IsString() banco?: string;
  @IsOptional() @IsString() arquivo_nome?: string;
  @IsOptional() @IsNumber() qtd_titulos?: number;
  @IsOptional() @IsNumber() valor_total?: number;
}
