import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterVendedoresDto {
  @IsOptional() @IsNumber() id_empresa?: number;
  @IsOptional() @IsString() nome?: string;
  @IsOptional() @IsString() cpf?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
