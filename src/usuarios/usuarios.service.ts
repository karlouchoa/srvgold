import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuariosDto } from './dto/create-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import { FilterUsuariosDto } from './dto/filter-usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuariosDto) {
    return this.prisma.usuarios.create({
      data: {
        ...data,
        usuarios_config: data.usuarios_config
          ? { create: data.usuarios_config }
          : undefined,
        usuarios_roles: data.usuarios_roles
          ? {
              create: data.usuarios_roles.map(r => ({
                id_role: r.id_role,
              })),
            }
          : undefined,
        usuarios_vendedores: data.usuarios_vendedores
          ? {
              create: data.usuarios_vendedores.map(v => ({
                id_vendedor: v.id_vendedor,
              })),
            }
          : undefined,
      },
      include: {
        usuarios_config: true,
        usuarios_roles: { include: { roles: true } },
        usuarios_vendedores: { include: { vendedores: true } },
      },
    });
  }

  async findAll(filters?: FilterUsuariosDto) {
    return this.prisma.usuarios.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.login && { login: { contains: filters.login, mode: 'insensitive' } }),
        ...(filters?.nome && { nome: { contains: filters.nome, mode: 'insensitive' } }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      include: {
        usuarios_config: true,
        usuarios_roles: { include: { roles: true } },
        usuarios_vendedores: { include: { vendedores: true } },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.usuarios.findUnique({
      where: { id_usuario: id },
      include: {
        usuarios_config: true,
        usuarios_roles: { include: { roles: true } },
        usuarios_vendedores: { include: { vendedores: true } },
      },
    });
  }

  async update(id: number, data: UpdateUsuariosDto) {
    return this.prisma.usuarios.update({
      where: { id_usuario: id },
      data: {
        ...data,
        usuarios_config: data.usuarios_config
          ? { deleteMany: {}, create: data.usuarios_config }
          : undefined,
        usuarios_roles: data.usuarios_roles
          ? { deleteMany: {}, create: data.usuarios_roles.map(r => ({ id_role: r.id_role })) }
          : undefined,
        usuarios_vendedores: data.usuarios_vendedores
          ? { deleteMany: {}, create: data.usuarios_vendedores.map(v => ({ id_vendedor: v.id_vendedor })) }
          : undefined,
      },
      include: {
        usuarios_config: true,
        usuarios_roles: { include: { roles: true } },
        usuarios_vendedores: { include: { vendedores: true } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.usuarios.update({
      where: { id_usuario: id },
      data: { ativo: false, isdeleted: true },
    });
  }
}
