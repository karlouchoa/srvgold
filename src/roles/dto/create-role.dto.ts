import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
