import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRetornoDto } from './dto/create-retorno.dto';
import { UpdateRetornoDto } from './dto/update-retorno.dto';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { FilterRetornoDto } from './dto/filter-retorno.dto';

@Injectable()
export class RetornosBancariosService {
  constructor(private prisma: PrismaService) {}

  // ===== RETORNOS BANCÁRIOS =====
  async createRetorno(data: CreateRetornoDto) {
    return this.prisma.retornos_bancarios.create({ data });
  }

  async findAllRetornos(filters?: FilterRetornoDto) {
    return this.prisma.retornos_bancarios.findMany({
      where: {
        ...(filters?.id_empresa && { id_empresa: filters.id_empresa }),
        ...(filters?.banco && { banco: { contains: filters.banco, mode: 'insensitive' } }),
        ...(filters?.data && { data: filters.data }),
      },
      include: { retorno_titulos: true, empresa: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findRetorno(id: number) {
    return this.prisma.retornos_bancarios.findUnique({
      where: { id },
      include: { retorno_titulos: { include: { contas_receber: true } } },
    });
  }

  async updateRetorno(id: number, data: UpdateRetornoDto) {
    return this.prisma.retornos_bancarios.update({ where: { id }, data });
  }

  async removeRetorno(id: number) {
    // Remove títulos associados
    await this.prisma.retorno_titulos.deleteMany({ where: { id_retorno: id } });
    return this.prisma.retornos_bancarios.delete({ where: { id } });
  }

  // ===== RETORNO_TITULOS =====
  async createTitulo(data: CreateTituloDto) {
    return this.prisma.retorno_titulos.create({ data });
  }

  async findTitulosByRetorno(id_retorno: number) {
    return this.prisma.retorno_titulos.findMany({
      where: { id_retorno },
      include: { contas_receber: true },
      orderBy: { id: 'asc' },
    });
  }

  async updateTitulo(id: number, data: UpdateTituloDto) {
    return this.prisma.retorno_titulos.update({ where: { id }, data });
  }

  async removeTitulo(id: number) {
    return this.prisma.retorno_titulos.delete({ where: { id } });
  }
}
