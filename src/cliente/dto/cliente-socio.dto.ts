import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ClienteSocioDto {
  @IsString() nome: string;
  @IsOptional() @IsNumber() percentual?: number;
}
