import { IsString, IsOptional, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UsuariosConfigDto } from './usuarios-config.dto';
import { UsuariosRolesDto } from './usuarios-roles.dto';
import { UsuariosVendedoresDto } from './usuarios-vendedores.dto';

export class CreateUsuariosDto {
  @IsNumber() id_empresa: number;
  @IsString() login: string;
  @IsString() senha_hash: string;
  @IsString() nome: string;

  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() telefone?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
  @IsOptional() @IsBoolean() administrador?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UsuariosConfigDto)
  usuarios_config?: UsuariosConfigDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UsuariosRolesDto)
  usuarios_roles?: UsuariosRolesDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UsuariosVendedoresDto)
  usuarios_vendedores?: UsuariosVendedoresDto[];
}
