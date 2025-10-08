import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGrupoDto } from './dto/grupos/create-grupo.dto';
import { UpdateGrupoDto } from './dto/grupos/update-grupo.dto';
import { CreateSubgrupoDto } from './dto/subgrupos/create-subgrupo.dto';
import { UpdateSubgrupoDto } from './dto/subgrupos/update-subgrupo.dto';
import { CreateFamiliaDto } from './dto/familias/create-familia.dto';
import { UpdateFamiliaDto } from './dto/familias/update-familia.dto';

@Injectable()
export class ClassificacaoService {
  constructor(private prisma: PrismaService) {}

  // ===== GRUPOS =====
  createGrupo(data: CreateGrupoDto) {
    return this.prisma.grupos.create({ data });
  }
  findAllGrupos() {
    return this.prisma.grupos.findMany({
      where: { ativo: true },
      include: { subgrupos: true },
      orderBy: { descricao: 'asc' },
    });
  }
  findGrupo(id: number) {
    return this.prisma.grupos.findUnique({
      where: { id_grupo: id },
      include: { subgrupos: true },
    });
  }
  updateGrupo(id: number, data: UpdateGrupoDto) {
    return this.prisma.grupos.update({ where: { id_grupo: id }, data });
  }
  removeGrupo(id: number) {
    return this.prisma.grupos.update({
      where: { id_grupo: id },
      data: { ativo: false },
    });
  }

  // ===== SUBGRUPOS =====
  createSubgrupo(data: CreateSubgrupoDto) {
    return this.prisma.subgrupos.create({ data });
  }
  findSubgruposByGrupo(id_grupo: number) {
    return this.prisma.subgrupos.findMany({
      where: { id_grupo },
      include: { familias: true },
      orderBy: { descricao: 'asc' },
    });
  }
  updateSubgrupo(id: number, data: UpdateSubgrupoDto) {
    return this.prisma.subgrupos.update({
      where: { id_subgrupo: id },
      data,
    });
  }
  removeSubgrupo(id: number) {
    return this.prisma.subgrupos.delete({ where: { id_subgrupo: id } });
  }

  // ===== FAMILIAS =====
  createFamilia(data: CreateFamiliaDto) {
    return this.prisma.familias.create({ data });
  }
  findFamiliasBySubgrupo(id_subgrupo: number) {
    return this.prisma.familias.findMany({
      where: { id_subgrupo },
      orderBy: { descricao: 'asc' },
    });
  }
  updateFamilia(id: number, data: UpdateFamiliaDto) {
    return this.prisma.familias.update({
      where: { id_familia: id },
      data,
    });
  }
  removeFamilia(id: number) {
    return this.prisma.familias.delete({ where: { id_familia: id } });
  }
}
