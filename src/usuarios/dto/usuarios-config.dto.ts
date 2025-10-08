import { IsOptional, IsNumber, IsBoolean, IsString } from 'class-validator';

export class UsuariosConfigDto {
  @IsOptional() @IsNumber() limite_desc?: number;
  @IsOptional() @IsNumber() limite_acresc?: number;
  @IsOptional() @IsBoolean() permite_multilogin?: boolean;
  @IsOptional() @IsString() modulo_acesso?: string;
  @IsOptional() @IsString() setor?: string;
}
