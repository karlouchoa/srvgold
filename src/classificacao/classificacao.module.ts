import { Module } from '@nestjs/common';
import { ClassificacaoService } from './classificacao.service';
import { PrismaService } from '../prisma.service';
import { GruposController } from './controllers/grupos.controller';
import { SubgruposController } from './controllers/subgrupos.controller';
import { FamiliasController } from './controllers/familias.controller';

@Module({
  controllers: [GruposController, SubgruposController, FamiliasController],
  providers: [ClassificacaoService, PrismaService],
})
export class ClassificacaoModule {}
