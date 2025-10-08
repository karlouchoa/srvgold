import { IsOptional, IsString, IsDateString } from 'class-validator';

export class VendedoresCredenciaisDto {
  @IsOptional() @IsString() senha?: string;
  @IsOptional() @IsString() usuario_vpn?: string;
  @IsOptional() @IsString() senha_vpn?: string;
  @IsOptional() @IsDateString() ultimo_login?: Date;
}
