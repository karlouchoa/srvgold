import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class FotosItensDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  ordem?: number;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
