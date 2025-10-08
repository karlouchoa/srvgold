import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRolePermissaoDto } from './dto/create-role-permissao.dto';
import { UpdateRolePermissaoDto } from './dto/update-role-permissao.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // ===== ROLES =====
  async createRole(data: CreateRoleDto) {
    return this.prisma.roles.create({ data });
  }

  async findAllRoles() {
    return this.prisma.roles.findMany({
      include: {
        roles_permissoes: { include: { permissoes: true } },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findRole(id_role: number) {
    return this.prisma.roles.findUnique({
      where: { id_role },
      include: {
        roles_permissoes: { include: { permissoes: true } },
        usuarios_roles: { include: { usuarios: true } },
      },
    });
  }

  async updateRole(id_role: number, data: UpdateRoleDto) {
    return this.prisma.roles.update({ where: { id_role }, data });
  }

  async removeRole(id_role: number) {
    // Exclui em cascata os vínculos de permissões
    await this.prisma.roles_permissoes.deleteMany({ where: { id_role } });
    return this.prisma.roles.delete({ where: { id_role } });
  }

  // ===== ROLES_PERMISSOES =====
  async addPermissaoToRole(data: CreateRolePermissaoDto) {
    return this.prisma.roles_permissoes.create({ data });
  }

  async findPermissoesByRole(id_role: number) {
    return this.prisma.roles_permissoes.findMany({
      where: { id_role },
      include: { permissoes: true },
    });
  }

  async removePermissaoFromRole(id_role: number, id_permissao: number) {
    return this.prisma.roles_permissoes.delete({
      where: { id_role_id_permissao: { id_role, id_permissao } },
    });
  }

  async updateRolePermissao(id_role: number, id_permissao: number, data: UpdateRolePermissaoDto) {
    return this.prisma.roles_permissoes.update({
      where: { id_role_id_permissao: { id_role, id_permissao } },
      data,
    });
  }
}
