import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Injectable()
export class BancoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBancoDto) {
    return this.prisma.banco.create({
      data: {
        ...data,
        conta_config: data.conta_config
          ? { create: data.conta_config }
          : undefined,
        boleto_config: data.boleto_config
          ? { create: data.boleto_config }
          : undefined,
        pix_config: data.pix_config
          ? { create: data.pix_config }
          : undefined,
        credenciais: data.credenciais
          ? { create: data.credenciais }
          : undefined,
      },
      include: {
        conta_config: true,
        boleto_config: true,
        pix_config: true,
        credenciais: true,
      },
    });
  }

  async findAll() {
    return this.prisma.banco.findMany({
      where: { isdeleted: false },
      include: {
        conta_config: true,
        boleto_config: true,
        pix_config: true,
        credenciais: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.banco.findUnique({
      where: { id },
      include: {
        conta_config: true,
        boleto_config: true,
        pix_config: true,
        credenciais: true,
      },
    });
  }

  async update(id: number, data: UpdateBancoDto) {
    return this.prisma.banco.update({
      where: { id },
      data: {
        ...data,
        conta_config: data.conta_config
          ? { upsert: { update: data.conta_config, create: data.conta_config } }
          : undefined,
        boleto_config: data.boleto_config
          ? { upsert: { update: data.boleto_config, create: data.boleto_config } }
          : undefined,
        pix_config: data.pix_config
          ? { upsert: { update: data.pix_config, create: data.pix_config } }
          : undefined,
        credenciais: data.credenciais
          ? { upsert: { update: data.credenciais, create: data.credenciais } }
          : undefined,
      },
      include: {
        conta_config: true,
        boleto_config: true,
        pix_config: true,
        credenciais: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.banco.update({
      where: { id },
      data: { isdeleted: true },
    });
  }
}
