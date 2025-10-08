import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVendasDto } from './dto/create-vendas.dto';
import { UpdateVendasDto } from './dto/update-vendas.dto';
import { FilterVendasDto } from './dto/filter-vendas.dto';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVendasDto) {
    return this.prisma.vendas.create({
      data: {
        ...data,
        venda_itens: data.venda_itens ? { create: data.venda_itens } : undefined,
        venda_pagamentos: data.venda_pagamentos
          ? { create: data.venda_pagamentos }
          : undefined,
        venda_status: data.venda_status
          ? { create: data.venda_status }
          : undefined,
      },
      include: {
        venda_itens: {
          include: {
            venda_itens_estoque: true,
            venda_itens_status: true,
            venda_itens_tributos: true,
          },
        },
        venda_pagamentos: true,
        venda_status: true,
      },
    });
  }

  async findAll(filters?: FilterVendasDto) {
    return this.prisma.vendas.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.id_cliente && { id_cliente: Number(filters.id_cliente) }),
        ...(filters?.numero && { numero: Number(filters.numero) }),
        ...(filters?.data_inicio &&
          filters?.data_fim && {
            data_emissao: {
              gte: new Date(filters.data_inicio),
              lte: new Date(filters.data_fim),
            },
          }),
      },
      include: {
        cliente: { select: { id: true, nome_razao: true } },
        vendedores: { select: { id_vendedor: true, nome: true } },
        venda_itens: true,
        venda_pagamentos: true,
        venda_status: true,
      },
      orderBy: { data_emissao: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.vendas.findUnique({
      where: { id_venda: id },
      include: {
        cliente: true,
        vendedores: true,
        venda_itens: {
          include: {
            venda_itens_estoque: true,
            venda_itens_status: true,
            venda_itens_tributos: true,
          },
        },
        venda_pagamentos: true,
        venda_status: true,
      },
    });
  }

  async update(id: number, data: UpdateVendasDto) {
    return this.prisma.vendas.update({
      where: { id_venda: id },
      data: {
        ...data,
        venda_itens: data.venda_itens
          ? { deleteMany: {}, create: data.venda_itens }
          : undefined,
        venda_pagamentos: data.venda_pagamentos
          ? { deleteMany: {}, create: data.venda_pagamentos }
          : undefined,
        venda_status: data.venda_status
          ? { create: data.venda_status }
          : undefined,
      },
      include: {
        venda_itens: {
          include: {
            venda_itens_estoque: true,
            venda_itens_status: true,
            venda_itens_tributos: true,
          },
        },
        venda_pagamentos: true,
        venda_status: true,
      },
    });
  }

  async cancel(id: number, usuario: string) {
    return this.prisma.venda_status.create({
      data: {
        id_venda: id,
        status: 'CANCELADA',
        usuario,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.vendas.update({
      where: { id_venda: id },
      data: { isdeleted: true, status: 'CANCELADA' },
    });
  }
}
