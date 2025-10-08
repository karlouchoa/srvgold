import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVendedoresDto } from './dto/create-vendedores.dto';
import { UpdateVendedoresDto } from './dto/update-vendedores.dto';
import { FilterVendedoresDto } from './dto/filter-vendedores.dto';

@Injectable()
export class VendedoresService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVendedoresDto) {
    return this.prisma.vendedores.create({
      data: {
        ...data,
        vendedores_comissao: data.vendedores_comissao
          ? { create: data.vendedores_comissao }
          : undefined,
        vendedores_credenciais: data.vendedores_credenciais
          ? { create: data.vendedores_credenciais }
          : undefined,
        vendedores_metas: data.vendedores_metas
          ? { create: data.vendedores_metas }
          : undefined,
      },
      include: {
        vendedores_comissao: true,
        vendedores_credenciais: true,
        vendedores_metas: true,
      },
    });
  }

  async findAll(filters?: FilterVendedoresDto) {
    return this.prisma.vendedores.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.nome && {
          nome: { contains: filters.nome, mode: 'insensitive' },
        }),
        ...(filters?.cpf && { cpf: filters.cpf }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      include: {
        vendedores_comissao: true,
        vendedores_metas: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.vendedores.findUnique({
      where: { id_vendedor: id },
      include: {
        vendedores_comissao: true,
        vendedores_credenciais: true,
        vendedores_metas: true,
      },
    });
  }

  async update(id: number, data: UpdateVendedoresDto) {
    return this.prisma.vendedores.update({
      where: { id_vendedor: id },
      data: {
        ...data,
        vendedores_comissao: data.vendedores_comissao
          ? { deleteMany: {}, create: data.vendedores_comissao }
          : undefined,
        vendedores_credenciais: data.vendedores_credenciais
          ? { deleteMany: {}, create: data.vendedores_credenciais }
          : undefined,
        vendedores_metas: data.vendedores_metas
          ? { deleteMany: {}, create: data.vendedores_metas }
          : undefined,
      },
      include: {
        vendedores_comissao: true,
        vendedores_credenciais: true,
        vendedores_metas: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.vendedores.update({
      where: { id_vendedor: id },
      data: { isdeleted: true, ativo: false },
    });
  }
}
