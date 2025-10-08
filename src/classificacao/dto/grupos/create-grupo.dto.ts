import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
export class CreateGrupoDto {
  @IsString() descricao: string;
  @IsOptional() @IsNumber() perc_comissao?: number;
  @IsOptional() @IsBoolean() ativo?: boolean;
  @IsOptional() @IsNumber() aliq_icms?: number;
  @IsOptional() @IsNumber() reducao_icms?: number;
  @IsOptional() @IsNumber() comissao_linha?: number;
}
