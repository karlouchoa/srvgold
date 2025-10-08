import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTituloDto {
  @IsNumber() id_retorno: number;
  @IsOptional() @IsNumber() id_titulo?: number;
  @IsOptional() @IsString() nosso_numero?: string;
  @IsOptional() @IsString() ocorrencia?: string;
  @IsOptional() @IsString() motivo?: string;
  @IsOptional() @IsNumber() valor_pago?: number;
}
