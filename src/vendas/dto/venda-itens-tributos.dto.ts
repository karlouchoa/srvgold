import { IsOptional, IsString, IsNumber } from 'class-validator';

export class VendaItensTributosDto {
  @IsOptional() @IsString() cst?: string;
  @IsOptional() @IsString() cfop?: string;
  @IsOptional() @IsNumber() base_icms?: number;
  @IsOptional() @IsNumber() valor_icms?: number;
  @IsOptional() @IsNumber() base_st?: number;
  @IsOptional() @IsNumber() valor_st?: number;
  @IsOptional() @IsNumber() valor_ipi?: number;
  @IsOptional() @IsNumber() valor_pis?: number;
  @IsOptional() @IsNumber() valor_cofins?: number;
}
