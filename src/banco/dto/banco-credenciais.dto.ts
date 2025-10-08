import { IsOptional, IsString } from 'class-validator';

export class BancoCredenciaisDto {
  @IsOptional()
  @IsString()
  caminho_certificado?: string;

  @IsOptional()
  @IsString()
  senha_certificado?: string;

  @IsOptional()
  @IsString()
  client_id?: string;

  @IsOptional()
  @IsString()
  client_secret?: string;
}
