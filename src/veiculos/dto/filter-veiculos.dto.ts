import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterVeiculosDto {
  @IsOptional() @IsNumber() id_empresa?: number;
  @IsOptional() @IsString() placa?: string;
  @IsOptional() @IsString() modelo?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
