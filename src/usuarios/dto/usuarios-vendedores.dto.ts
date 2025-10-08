import { IsNumber } from 'class-validator';

export class UsuariosVendedoresDto {
  @IsNumber()
  id_vendedor: number;
}
