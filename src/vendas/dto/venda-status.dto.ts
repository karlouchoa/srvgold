import { IsString, IsOptional, IsDateString } from 'class-validator';

export class VendaStatusDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsDateString()
  data_status?: Date;
}
