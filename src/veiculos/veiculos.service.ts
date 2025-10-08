import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVeiculosDto } from './dto/create-veiculos.dto';
import { UpdateVeiculosDto } from './dto/update-veiculos.dto';
import { FilterVeiculosDto } from './dto/filter-veiculos.dto';

@Injectable()
export class VeiculosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVeiculosDto) {
    return this.prisma.veiculos.create({ data });
  }

  async findAll(filters?: FilterVeiculosDto) {
    return this.prisma.veiculos.findMany({
      where: {
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.placa && { placa: { contains: filters.placa, mode: 'insensitive' } }),
        ...(filters?.modelo && { modelo: { contains: filters.modelo, mode: 'insensitive' } }),
        ...(filters?.ativo !== undefined && { ativo: filters.ativo }),
      },
      orderBy: { descricao: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.veiculos.findUnique({ where: { id_veiculo: id } });
  }

  async update(id: number, data: UpdateVeiculosDto) {
    return this.prisma.veiculos.update({
      where: { id_veiculo: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.veiculos.update({
      where: { id_veiculo: id },
      data: { ativo: false },
    });
  }
}
