import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCaixaAberturasDto } from './dto/create-caixa-aberturas.dto';
import { UpdateCaixaAberturasDto } from './dto/update-caixa-aberturas.dto';

@Injectable()
export class CaixaAberturasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCaixaAberturasDto) {
    return this.prisma.caixa_aberturas.create({
      data: {
        ...data,
        caixa_documentos: data.caixa_documentos
          ? { create: data.caixa_documentos }
          : undefined,
        caixa_pagamentos: data.caixa_pagamentos
          ? { create: data.caixa_pagamentos }
          : undefined,
      },
      include: {
        caixa_documentos: true,
        caixa_pagamentos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.caixa_aberturas.findMany({
      include: {
        caixa_documentos: true,
        caixa_pagamentos: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.caixa_aberturas.findUnique({
      where: { id_caixa: id },
      include: {
        caixa_documentos: true,
        caixa_pagamentos: true,
      },
    });
  }

  async update(id: number, data: UpdateCaixaAberturasDto) {
    return this.prisma.caixa_aberturas.update({
      where: { id_caixa: id },
      data: {
        ...data,
        caixa_documentos: data.caixa_documentos
          ? { upsert: { update: data.caixa_documentos, create: data.caixa_documentos } }
          : undefined,
        caixa_pagamentos: data.caixa_pagamentos
          ? { upsert: { update: data.caixa_pagamentos, create: data.caixa_pagamentos } }
          : undefined,
      },
      include: {
        caixa_documentos: true,
        caixa_pagamentos: true,
      },
    });
  }

  async close(id: number, saldoFinal: number) {
    return this.prisma.caixa_aberturas.update({
      where: { id_caixa: id },
      data: {
        data_fechamento: new Date(),
        saldo_final: saldoFinal,
        status: 'FECHADO',
      },
    });
  }

  async remove(id: number) {
    return this.prisma.caixa_aberturas.delete({ where: { id_caixa: id } });
  }
}
