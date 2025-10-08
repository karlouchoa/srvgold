import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterUsuariosDto {
  @IsOptional() @IsNumber() id_empresa?: number;
  @IsOptional() @IsString() login?: string;
  @IsOptional() @IsString() nome?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
