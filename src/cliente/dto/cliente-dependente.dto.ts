import { IsString, IsOptional, IsDateString } from 'class-validator';

export class ClienteDependenteDto {
  @IsString() nome: string;
  @IsOptional() @IsDateString() data_nascimento?: Date;
  @IsOptional() @IsString() parentesco?: string;
}
