// src/pagamentos/pagamentos.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTipoDto } from './dto/tipos/create-tipo.dto';
import { UpdateTipoDto } from './dto/tipos/update-tipo.dto';
import { FilterTipoDto } from './dto/tipos/filter-tipo.dto';
import { CreateFormaDto } from './dto/formas/create-forma.dto';
import { UpdateFormaDto } from './dto/formas/update-forma.dto';
import { FilterFormaDto } from './dto/formas/filter-forma.dto';
import { CreateParcelaDto } from './dto/parcelas/create-parcela.dto';
import { UpdateParcelaDto } from './dto/parcelas/update-parcela.dto';
import { FilterParcelaDto } from './dto/parcelas/filter-parcela.dto';

@Injectable()
export class PagamentosService {
  constructor(private prisma: PrismaService) {}

  // ===== TIPOS_PAGAMENTO =====
  createTipo(data: CreateTipoDto) {
    return this.prisma.tipos_pagamento.create({ data });
  }
  findTipos(filters?: FilterTipoDto) {
    return this.prisma.tipos_pagamento.findMany({
      where: {
        isdeleted: false,
        ...(filters?.descricao && { descricao: { contains: filters.descricao, mode: 'insensitive' } }),
        ...(filters?.categoria && { categoria: { contains: filters.categoria, mode: 'insensitive' } }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      orderBy: { descricao: 'asc' },
    });
  }
  findTipo(id_tipo: number) {
    return this.prisma.tipos_pagamento.findUnique({
      where: { id_tipo },
      include: { formas_pagamento: true },
    });
  }
  updateTipo(id_tipo: number, data: UpdateTipoDto) {
    return this.prisma.tipos_pagamento.update({ where: { id_tipo }, data });
  }
  removeTipo(id_tipo: number) {
    return this.prisma.tipos_pagamento.update({
      where: { id_tipo },
      data: { isdeleted: true, ativo: false },
    });
  }

  // ===== FORMAS_PAGAMENTO =====
  createForma(data: CreateFormaDto) {
    return this.prisma.formas_pagamento.create({
      data: {
        ...data,
        formas_pagamento_parcelas: data.parcelas?.length
          ? { create: data.parcelas }
          : undefined,
      },
      include: { formas_pagamento_parcelas: true, tipos_pagamento: true },
    });
  }
  findFormas(filters?: FilterFormaDto) {
    return this.prisma.formas_pagamento.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_tipo && { id_tipo: Number(filters.id_tipo) }),
        ...(filters?.descricao && { descricao: { contains: filters.descricao, mode: 'insensitive' } }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      include: { tipos_pagamento: true },
      orderBy: { descricao: 'asc' },
    });
  }
  findForma(id_forma: number) {
    return this.prisma.formas_pagamento.findUnique({
      where: { id_forma },
      include: { formas_pagamento_parcelas: true, tipos_pagamento: true },
    });
  }
  findFormasByTipo(id_tipo: number) {
    return this.prisma.formas_pagamento.findMany({
      where: { id_tipo, isdeleted: false },
      include: { formas_pagamento_parcelas: true },
      orderBy: { descricao: 'asc' },
    });
  }
  updateForma(id_forma: number, data: UpdateFormaDto) {
    return this.prisma.formas_pagamento.update({
      where: { id_forma },
      data: {
        ...data,
        ...(data.parcelas
          ? { formas_pagamento_parcelas: { deleteMany: {}, create: data.parcelas } }
          : {}),
      },
      include: { formas_pagamento_parcelas: true },
    });
  }
  removeForma(id_forma: number) {
    return this.prisma.formas_pagamento.update({
      where: { id_forma },
      data: { isdeleted: true, ativo: false },
    });
  }

  // ===== FORMAS_PAGAMENTO_PARCELAS =====
  createParcela(data: CreateParcelaDto) {
    return this.prisma.formas_pagamento_parcelas.create({ data });
  }
  findParcelas(filters?: FilterParcelaDto) {
    return this.prisma.formas_pagamento_parcelas.findMany({
      where: {
        ...(filters?.id_forma && { id_forma: Number(filters.id_forma) }),
        ...(filters?.ordem && { ordem: Number(filters.ordem) }),
      },
      orderBy: [{ id_forma: 'asc' }, { ordem: 'asc' }],
    });
  }
  findParcelasByForma(id_forma: number) {
    return this.prisma.formas_pagamento_parcelas.findMany({
      where: { id_forma },
      orderBy: { ordem: 'asc' },
    });
  }
  updateParcela(id_parcela: number, data: UpdateParcelaDto) {
    return this.prisma.formas_pagamento_parcelas.update({ where: { id_parcela }, data });
  }
  removeParcela(id_parcela: number) {
    return this.prisma.formas_pagamento_parcelas.delete({ where: { id_parcela } });
  }
}
