import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
export class FilterRetornoDto {
  @IsOptional() @IsNumber() id_empresa?: number;
  @IsOptional() @IsString() banco?: string;
  @IsOptional() @IsDateString() data?: string;
}
