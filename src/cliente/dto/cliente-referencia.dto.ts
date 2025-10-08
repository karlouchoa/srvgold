import { IsString, IsOptional } from 'class-validator';

export class ClienteReferenciaDto {
  @IsString() tipo: string;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsString() telefone?: string;
  @IsOptional() @IsString() observacao?: string;
}
