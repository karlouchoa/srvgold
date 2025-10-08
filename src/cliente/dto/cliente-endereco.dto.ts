import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ClienteEnderecoDto {
  @IsString() tipo: string;
  @IsOptional() @IsString() logradouro?: string;
  @IsOptional() @IsString() numero?: string;
  @IsOptional() @IsString() complemento?: string;
  @IsOptional() @IsString() bairro?: string;
  @IsOptional() @IsNumber() id_cidade?: number;
  @IsOptional() @IsString() cep?: string;
}
