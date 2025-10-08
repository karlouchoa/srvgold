import { PartialType } from '@nestjs/mapped-types';
import { CreateRolePermissaoDto } from './create-role-permissao.dto';
export class UpdateRolePermissaoDto extends PartialType(CreateRolePermissaoDto) {}
