import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUnidadesMedidaDto } from './dto/create-unidades-medida.dto';
import { UpdateUnidadesMedidaDto } from './dto/update-unidades-medida.dto';
import { FilterUnidadesMedidaDto } from './dto/filter-unidades-medida.dto';

@Injectable()
export class UnidadesMedidaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUnidadesMedidaDto) {
    return this.prisma.unidades_medida.create({ data });
  }

  async findAll(filters?: FilterUnidadesMedidaDto) {
    return this.prisma.unidades_medida.findMany({
      where: {
        isdeleted: false,
        ...(filters?.sigla && { sigla: { contains: filters.sigla, mode: 'insensitive' } }),
        ...(filters?.descricao && { descricao: { contains: filters.descricao, mode: 'insensitive' } }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      orderBy: { descricao: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.unidades_medida.findUnique({
      where: { id_unidade: id },
      include: {
        unidades_medida: true, // unidade base
        other_unidades_medida: true, // unidades derivadas
      },
    });
  }

  async update(id: number, data: UpdateUnidadesMedidaDto) {
    return this.prisma.unidades_medida.update({
      where: { id_unidade: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.unidades_medida.update({
      where: { id_unidade: id },
      data: { ativo: false, isdeleted: true },
    });
  }
}
