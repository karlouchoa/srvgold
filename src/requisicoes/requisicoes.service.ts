import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRequisicaoCompraDto } from './dto/compra/create-requisicao-compra.dto';
import { UpdateRequisicaoCompraDto } from './dto/compra/update-requisicao-compra.dto';
import { CreateRequisicaoItemDto } from './dto/itens/create-requisicao-item.dto';
import { UpdateRequisicaoItemDto } from './dto/itens/update-requisicao-item.dto';
import { CreateRequisicaoEstoqueDto } from './dto/estoque/create-requisicao-estoque.dto';
import { UpdateRequisicaoEstoqueDto } from './dto/estoque/update-requisicao-estoque.dto';
import { CreateRequisicaoEstoqueItemDto } from './dto/estoque/create-requisicao-estoque-item.dto';

@Injectable()
export class RequisicoesService {
  constructor(private prisma: PrismaService) {}

  // =======================
  // REQUISIÇÕES DE COMPRA
  // =======================

  async createRequisicaoCompra(dto: CreateRequisicaoCompraDto) {
    return this.prisma.requisicoes_compra.create({ data: dto });
  }

  async findAllRequisicoesCompra(id_empresa: number) {
    return this.prisma.requisicoes_compra.findMany({
      where: { id_empresa, isdeleted: false },
      include: { requisicao_itens: { include: { itens: true } }, usuarios: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findRequisicaoCompra(id: number) {
    return this.prisma.requisicoes_compra.findUnique({
      where: { id },
      include: { requisicao_itens: { include: { itens: true } } },
    });
  }

  async updateRequisicaoCompra(id: number, dto: UpdateRequisicaoCompraDto) {
    return this.prisma.requisicoes_compra.update({ where: { id }, data: dto });
  }

  async deleteRequisicaoCompra(id: number) {
    await this.prisma.requisicao_itens.deleteMany({ where: { id_requisicao: id } });
    return this.prisma.requisicoes_compra.delete({ where: { id } });
  }

  // =======================
  // REQUISIÇÃO DE COMPRA - ITENS
  // =======================

  async createRequisicaoItem(dto: CreateRequisicaoItemDto) {
    return this.prisma.requisicao_itens.create({ data: dto });
  }

  async updateRequisicaoItem(id: number, dto: UpdateRequisicaoItemDto) {
    return this.prisma.requisicao_itens.update({ where: { id }, data: dto });
  }

  async updateStatusItem(id: number, status: string) {
    return this.prisma.requisicao_itens.update({
      where: { id },
      data: { status, updated_at: new Date() },
    });
  }

  async deleteRequisicaoItem(id: number) {
    return this.prisma.requisicao_itens.delete({ where: { id } });
  }

  // =======================
  // REQUISIÇÕES DE ESTOQUE
  // =======================

  async createRequisicaoEstoque(dto: CreateRequisicaoEstoqueDto) {
    return this.prisma.requisicoes_estoque.create({ data: dto });
  }

  async findAllRequisicoesEstoque(id_empresa: number) {
    return this.prisma.requisicoes_estoque.findMany({
      where: { id_empresa, isdeleted: false },
      include: {
        requisicoes_estoque_itens: { include: { itens: true, unidades_medida: true } },
        empresa: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findRequisicaoEstoque(id_req: number) {
    return this.prisma.requisicoes_estoque.findUnique({
      where: { id_req },
      include: { requisicoes_estoque_itens: { include: { itens: true } } },
    });
  }

  async updateRequisicaoEstoque(id_req: number, dto: UpdateRequisicaoEstoqueDto) {
    return this.prisma.requisicoes_estoque.update({ where: { id_req }, data: dto });
  }

  async deleteRequisicaoEstoque(id_req: number) {
    await this.prisma.requisicoes_estoque_itens.deleteMany({ where: { id_req } });
    return this.prisma.requisicoes_estoque.delete({ where: { id_req } });
  }

  // =======================
  // REQUISIÇÃO DE ESTOQUE - ITENS
  // =======================

  async createRequisicaoEstoqueItem(dto: CreateRequisicaoEstoqueItemDto) {
    return this.prisma.requisicoes_estoque_itens.create({ data: dto });
  }

  async updateRequisicaoEstoqueItem(id_req_item: number, dto: CreateRequisicaoEstoqueItemDto) {
    return this.prisma.requisicoes_estoque_itens.update({ where: { id_req_item }, data: dto });
  }

  async deleteRequisicaoEstoqueItem(id_req_item: number) {
    return this.prisma.requisicoes_estoque_itens.delete({ where: { id_req_item } });
  }
}
