import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateSubgrupoDto {
  @IsNumber() id_grupo: number;
  @IsString() descricao: string;
  @IsOptional() @IsString() identificador?: string;
}
