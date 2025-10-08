import { IsOptional, IsString } from 'class-validator';

export class BancoPixConfigDto {
  @IsOptional()
  @IsString()
  chave_pix?: string;

  @IsOptional()
  @IsString()
  tipo_chave_pix?: string;

  @IsOptional()
  @IsString()
  psp?: string;

  @IsOptional()
  @IsString()
  ambiente?: string;
}
