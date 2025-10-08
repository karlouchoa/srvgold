import { IsString, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BancoContaDto } from './banco-conta.dto';
import { BancoBoletoConfigDto } from './banco-boleto-config.dto';
import { BancoPixConfigDto } from './banco-pix-config.dto';
import { BancoCredenciaisDto } from './banco-credenciais.dto';

export class CreateBancoDto {
  @IsString()
  codigo: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsBoolean()
  bloqueia_venda_sn?: boolean;

  @IsOptional()
  @IsBoolean()
  digital_sn?: boolean;

  @IsOptional()
  @IsBoolean()
  ativo_sn?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => BancoContaDto)
  conta_config?: BancoContaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BancoBoletoConfigDto)
  boleto_config?: BancoBoletoConfigDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BancoPixConfigDto)
  pix_config?: BancoPixConfigDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BancoCredenciaisDto)
  credenciais?: BancoCredenciaisDto;
}
