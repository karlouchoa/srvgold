import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateItensDto } from './dto/create-itens.dto';
import { UpdateItensDto } from './dto/update-itens.dto';
import { FilterItensDto } from './dto/filter-itens.dto';
import { TributacaoItensDto } from './dto/tributacao-itens.dto';
import { CreateSaldoDto } from './dto/saldos/create-saldo.dto';
import { FilterSaldoDto } from './dto/saldos/filter-saldo.dto';
import { UpdateSaldoDto } from './dto/saldos/update-saldo.dto';

@Injectable()
export class ItensService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateItensDto) {
    const { fotos_itens, itens_bom, ...rest } = data;

    return this.prisma.itens.create({
      data: {
        ...rest,
        ...(fotos_itens?.length && { fotos_itens: { create: fotos_itens } }),
        ...(itens_bom?.length && {
          itens_bom_itens_bom_id_item_paiToitens: {
            create: itens_bom.map((bom) => ({
              ...bom,
              id_empresa: rest.id_empresa,
            })),
          },
        }),
      },
      include: {
        fotos_itens: true,
        itens_bom_itens_bom_id_item_paiToitens: true,
      },
    });
  }

  async findAll(filters?: FilterItensDto) {
    return this.prisma.itens.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.descricao && {
          descricao: { contains: filters.descricao, mode: 'insensitive' },
        }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      include: {
        fotos_itens: true,
        itens_bom_itens_bom_id_item_paiToitens: true,
        empresa: { select: { id: true, nome_fantasia: true } },
      },
      orderBy: { descricao: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.itens.findUnique({
      where: { id_item: id },
      include: {
        fotos_itens: true,
        itens_bom_itens_bom_id_item_paiToitens: true,
      },
    });
  }

  async update(id: number, data: UpdateItensDto) {
    const { fotos_itens, itens_bom, ...rest } = data;

    let empresaIdForBom = rest.id_empresa;
    if (itens_bom && itens_bom.length && !empresaIdForBom) {
      const existing = await this.prisma.itens.findUnique({
        where: { id_item: id },
        select: { id_empresa: true },
      });
      empresaIdForBom = existing?.id_empresa
        ? Number(existing.id_empresa)
        : undefined;
    }

    return this.prisma.itens.update({
      where: { id_item: id },
      data: {
        ...rest,
        ...(fotos_itens && {
          fotos_itens: {
            deleteMany: {},
            ...(fotos_itens.length ? { create: fotos_itens } : {}),
          },
        }),
        ...(itens_bom && {
          itens_bom_itens_bom_id_item_paiToitens: {
            deleteMany: {},
            ...(itens_bom.length && empresaIdForBom
              ? {
                  create: itens_bom.map((bom) => ({
                    ...bom,
                    id_empresa: empresaIdForBom!,
                  })),
                }
              : {}),
          },
        }),
      },
      include: {
        fotos_itens: true,
        itens_bom_itens_bom_id_item_paiToitens: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.itens.update({
      where: { id_item: id },
      data: { isdeleted: true, ativo: false },
    });
  }

// SEÇÃO: TRIBUTAÇÃO DOS ITENS

async addTributacao(dto: TributacaoItensDto) {
  return this.prisma.tributacao_itens.create({ data: dto });
}

async findTributacoesByItem(id_item: number) {
  return this.prisma.tributacao_itens.findMany({
    where: { id_item, isdeleted: false },
    include: {
      clasfis: true,
      cst: true,
    },
    orderBy: { id_tributacao: 'asc' },
  });
}

async updateTributacao(id_tributacao: number, dto: TributacaoItensDto) {
  return this.prisma.tributacao_itens.update({
    where: { id_tributacao },
    data: dto,
  });
}

async removeTributacao(id_tributacao: number) {
  return this.prisma.tributacao_itens.update({
    where: { id_tributacao },
    data: { isdeleted: true },
  });
}

// SEÇÃO: SALDOS DOS ITENS

async addSaldo(dto: CreateSaldoDto) {
  const existente = await this.prisma.saldos_itens.findFirst({
    where: { id_empresa: dto.id_empresa, id_item: dto.id_item, isdeleted: false },
  });

  if (existente) {
    // Atualiza o saldo existente
    return this.prisma.saldos_itens.update({
      where: { id_saldo: existente.id_saldo },
      data: { saldo: dto.saldo, updated_at: new Date() },
    });
  }

  // Cria novo saldo
  return this.prisma.saldos_itens.create({ data: dto });
}

async findSaldos(filters?: FilterSaldoDto) {
  return this.prisma.saldos_itens.findMany({
    where: {
      isdeleted: false,
      ...(filters?.id_empresa && { id_empresa: filters.id_empresa }),
      ...(filters?.id_item && { id_item: filters.id_item }),
      ...(filters?.endereco && { endereco: { contains: filters.endereco, mode: 'insensitive' } }),
    },
    include: { itens: true, empresa: true },
    orderBy: [{ id_empresa: 'asc' }, { id_item: 'asc' }],
  });
}

async findSaldoByItem(id_item: number) {
  return this.prisma.saldos_itens.findMany({
    where: { id_item, isdeleted: false },
    include: { empresa: true },
  });
}

async updateSaldo(id_saldo: number, dto: UpdateSaldoDto) {
  return this.prisma.saldos_itens.update({
    where: { id_saldo },
    data: { ...dto, updated_at: new Date() },
  });
}

async removeSaldo(id_saldo: number) {
  return this.prisma.saldos_itens.update({
    where: { id_saldo },
    data: { isdeleted: true },
  });
}

}
