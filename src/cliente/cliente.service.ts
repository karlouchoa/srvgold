import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FilterClienteDto } from './dto/filter-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: {
        ...data,
        cliente_associado: data.cliente_associado
          ? { create: data.cliente_associado }
          : undefined,
        cliente_dependente: data.cliente_dependente
          ? { create: data.cliente_dependente }
          : undefined,
        cliente_endereco: data.cliente_endereco
          ? { create: data.cliente_endereco }
          : undefined,
        cliente_referencia: data.cliente_referencia
          ? { create: data.cliente_referencia }
          : undefined,
        cliente_socio: data.cliente_socio
          ? { create: data.cliente_socio }
          : undefined,
      },
      include: {
        cliente_associado: true,
        cliente_dependente: true,
        cliente_endereco: true,
        cliente_referencia: true,
        cliente_socio: true,
      },
    });
  }

  async findAll(filters?: FilterClienteDto) {
    return this.prisma.cliente.findMany({
      where: {
        isdeleted: false,
        ...(filters?.id_empresa && { id_empresa: Number(filters.id_empresa) }),
        ...(filters?.nome_razao && {
          nome_razao: { contains: filters.nome_razao, mode: 'insensitive' },
        }),
        ...(filters?.cpf_cnpj && { cpf_cnpj: { equals: filters.cpf_cnpj } }),
        ...(filters?.ativo_sn !== undefined && { ativo_sn: filters.ativo_sn }),
      },
      include: {
        cliente_endereco: true,
        cliente_associado: true,
      },
      orderBy: { nome_razao: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: {
        cliente_associado: true,
        cliente_dependente: true,
        cliente_endereco: true,
        cliente_referencia: true,
        cliente_socio: true,
      },
    });
  }

  async update(id: number, data: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: { id },
      data: {
        ...data,
        cliente_associado: data.cliente_associado
          ? { deleteMany: {}, create: data.cliente_associado }
          : undefined,
        cliente_dependente: data.cliente_dependente
          ? { deleteMany: {}, create: data.cliente_dependente }
          : undefined,
        cliente_endereco: data.cliente_endereco
          ? { deleteMany: {}, create: data.cliente_endereco }
          : undefined,
        cliente_referencia: data.cliente_referencia
          ? { deleteMany: {}, create: data.cliente_referencia }
          : undefined,
        cliente_socio: data.cliente_socio
          ? { deleteMany: {}, create: data.cliente_socio }
          : undefined,
      },
      include: {
        cliente_associado: true,
        cliente_dependente: true,
        cliente_endereco: true,
        cliente_referencia: true,
        cliente_socio: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.cliente.update({
      where: { id },
      data: { isdeleted: true, ativo_sn: false },
    });
  }
}
