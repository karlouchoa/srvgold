import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class VendedoresMetasDto {
  @IsOptional() @IsNumber() meta_mensal?: number;
  @IsOptional() @IsNumber() mg_boa?: number;
  @IsOptional() @IsNumber() mg_otima?: number;
  @IsOptional() @IsNumber() mg_ruim?: number;
  @IsDateString() referencia: Date;
}
