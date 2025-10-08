// src/pagamentos/dto/tipos/create-tipo.dto.ts
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateTipoDto {
  @IsString() descricao: string;
  @IsString() categoria: string;

  @IsOptional() @IsNumber() taxa_adm?: number;
  @IsOptional() @IsBoolean() gera_comissao?: boolean;
  @IsOptional() @IsBoolean() exige_senha?: boolean;
  @IsOptional() @IsBoolean() integra_tef?: boolean;
  @IsOptional() @IsBoolean() pix?: boolean;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
