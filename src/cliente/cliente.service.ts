import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FilterClienteDto } from './dto/filter-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClienteDto) {
    const {
      cliente_associado,
      cliente_dependente,
      cliente_endereco,
      cliente_referencia,
      cliente_socio,
      ...rest
    } = data;

    return this.prisma.cliente.create({
      data: {
        ...rest,
        ...(cliente_associado?.length && {
          cliente_associado: { create: cliente_associado },
        }),
        ...(cliente_dependente?.length && {
          cliente_dependente: { create: cliente_dependente },
        }),
        ...(cliente_endereco?.length && {
          cliente_endereco: { create: cliente_endereco },
        }),
        ...(cliente_referencia?.length && {
          cliente_referencia: { create: cliente_referencia },
        }),
        ...(cliente_socio?.length && {
          cliente_socio: { create: cliente_socio },
        }),
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
    const {
      cliente_associado,
      cliente_dependente,
      cliente_endereco,
      cliente_referencia,
      cliente_socio,
      ...rest
    } = data;

    return this.prisma.cliente.update({
      where: { id },
      data: {
        ...rest,
        ...(cliente_associado && {
          cliente_associado: { deleteMany: {}, create: cliente_associado },
        }),
        ...(cliente_dependente && {
          cliente_dependente: { deleteMany: {}, create: cliente_dependente },
        }),
        ...(cliente_endereco && {
          cliente_endereco: { deleteMany: {}, create: cliente_endereco },
        }),
        ...(cliente_referencia && {
          cliente_referencia: { deleteMany: {}, create: cliente_referencia },
        }),
        ...(cliente_socio && {
          cliente_socio: { deleteMany: {}, create: cliente_socio },
        }),
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
