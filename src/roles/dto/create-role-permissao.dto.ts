import { IsNumber } from 'class-validator';

export class CreateRolePermissaoDto {
  @IsNumber() id_role: number;
  @IsNumber() id_permissao: number;
}
