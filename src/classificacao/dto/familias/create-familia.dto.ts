import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateFamiliaDto {
  @IsNumber() id_subgrupo: number;
  @IsString() descricao: string;
  @IsOptional() @IsString() identificador?: string;
  @IsOptional() @IsString() status?: string;
}
