import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVendasDto } from './dto/create-vendas.dto';
import { UpdateVendasDto } from './dto/update-vendas.dto';
import { FilterVendasDto } from './dto/filter-vendas.dto';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVendasDto) {
    const { venda_itens, venda_pagamentos, venda_status, ...rest } = data;

    return this.prisma.vendas.create({
      data: {
        ...rest,
        ...(venda_itens?.length && {
          venda_itens: {
            create: venda_itens.map(
              ({
                id_item,
                venda_itens_estoque,
                venda_itens_status,
                venda_itens_tributos,
                ...itemRest
              }) => ({
                ...itemRest,
                itens: { connect: { id_item } },
                ...(venda_itens_estoque?.length && {
                  venda_itens_estoque: { create: venda_itens_estoque },
                }),
                ...(venda_itens_status?.length && {
                  venda_itens_status: { create: venda_itens_status },
                }),
                ...(venda_itens_tributos?.length && {
                  venda_itens_tributos: { create: venda_itens_tributos },
                }),
              }),
            ),
          },
        }),
        ...(venda_pagamentos?.length && {
          venda_pagamentos: { create: venda_pagamentos },
        }),
        ...(venda_status?.length && {
          venda_status: { create: venda_status },
        }),
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
    const { venda_itens, venda_pagamentos, venda_status, ...rest } = data;

    return this.prisma.vendas.update({
      where: { id_venda: id },
      data: {
        ...rest,
        ...(venda_itens && {
          venda_itens: {
            deleteMany: {},
            ...(venda_itens.length && {
              create: venda_itens.map(
                ({
                  id_item,
                  venda_itens_estoque,
                  venda_itens_status,
                  venda_itens_tributos,
                  ...itemRest
                }) => ({
                  ...itemRest,
                  itens: { connect: { id_item } },
                  ...(venda_itens_estoque?.length && {
                    venda_itens_estoque: { create: venda_itens_estoque },
                  }),
                  ...(venda_itens_status?.length && {
                    venda_itens_status: { create: venda_itens_status },
                  }),
                  ...(venda_itens_tributos?.length && {
                    venda_itens_tributos: { create: venda_itens_tributos },
                  }),
                }),
              ),
            }),
          },
        }),
        ...(venda_pagamentos && {
          venda_pagamentos: {
            deleteMany: {},
            ...(venda_pagamentos.length && { create: venda_pagamentos }),
          },
        }),
        ...(venda_status?.length && {
          venda_status: { create: venda_status },
        }),
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
