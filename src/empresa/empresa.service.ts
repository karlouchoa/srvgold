import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { FilterEmpresaDto } from './dto/filter-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmpresaDto) {
    return this.prisma.empresa.create({ data });
  }

  async findAll(filters?: FilterEmpresaDto) {
    return this.prisma.empresa.findMany({
      where: {
        isdeleted: false,
        ...(filters?.nome_fantasia && {
          nome_fantasia: { contains: filters.nome_fantasia, mode: 'insensitive' },
        }),
        ...(filters?.razao_social && {
          razao_social: { contains: filters.razao_social, mode: 'insensitive' },
        }),
        ...(filters?.cnpj && { cnpj: { equals: filters.cnpj } }),
        ...(filters?.id_cidade && { id_cidade: Number(filters.id_cidade) }),
      },
      include: { cidade: true },
      orderBy: { razao_social: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.empresa.findUnique({
      where: { id },
      include: { cidade: true },
    });
  }

  async update(id: number, data: UpdateEmpresaDto) {
    return this.prisma.empresa.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.empresa.update({
      where: { id },
      data: { isdeleted: true },
    });
  }
}
