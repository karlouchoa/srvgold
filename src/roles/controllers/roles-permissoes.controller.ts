import { Controller, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { CreateRolePermissaoDto } from '../dto/create-role-permissao.dto';
import { UpdateRolePermissaoDto } from '../dto/update-role-permissao.dto';

@Controller('roles-permissoes')
export class RolesPermissoesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  addPermissao(@Body() dto: CreateRolePermissaoDto) {
    return this.service.addPermissaoToRole(dto);
  }

  @Patch(':id_role/:id_permissao')
  updatePermissao(
    @Param('id_role') id_role: string,
    @Param('id_permissao') id_permissao: string,
    @Body() dto: UpdateRolePermissaoDto,
  ) {
    return this.service.updateRolePermissao(+id_role, +id_permissao, dto);
  }

  @Delete(':id_role/:id_permissao')
  removePermissao(
    @Param('id_role') id_role: string,
    @Param('id_permissao') id_permissao: string,
  ) {
    return this.service.removePermissaoFromRole(+id_role, +id_permissao);
  }
}
