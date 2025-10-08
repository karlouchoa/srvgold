import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class ClienteAssociadoDto {
  @IsOptional() @IsString() matricula?: string;
  @IsOptional() @IsDateString() dt_admissao?: Date;
  @IsOptional() @IsString() sexo?: string;
  @IsOptional() @IsString() profissao?: string;
  @IsOptional() @IsString() pai?: string;
  @IsOptional() @IsString() mae?: string;
  @IsOptional() @IsString() conjuge?: string;
  @IsOptional() @IsNumber() renda_principal?: number;
  @IsOptional() @IsNumber() renda_complementar?: number;
}
