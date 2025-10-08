import { IsOptional, IsString, IsDateString } from 'class-validator';

export class VendaItensStatusDto {
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() usuario?: string;
  @IsOptional() @IsDateString() data_status?: Date;
}
