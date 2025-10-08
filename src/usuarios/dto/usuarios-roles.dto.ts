import { IsNumber } from 'class-validator';

export class UsuariosRolesDto {
  @IsNumber()
  id_role: number;
}
