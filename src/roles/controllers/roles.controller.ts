import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post() create(@Body() dto: CreateRoleDto) {
    return this.service.createRole(dto);
  }

  @Get() findAll() {
    return this.service.findAllRoles();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findRole(+id);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.service.updateRole(+id, dto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.removeRole(+id);
  }

  @Get(':id/permissoes')
  findPermissoesByRole(@Param('id') id: string) {
    return this.service.findPermissoesByRole(+id);
  }
}
