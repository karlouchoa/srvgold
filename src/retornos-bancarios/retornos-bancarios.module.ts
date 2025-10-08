import { Module } from '@nestjs/common';
import { RetornosBancariosService } from './retornos-bancarios.service';
import { PrismaService } from '../prisma.service';
import { RetornosBancariosController } from './controllers/retornos-bancarios.controller';
import { RetornoTitulosController } from './controllers/retorno-titulos.controller';

@Module({
  controllers: [RetornosBancariosController, RetornoTitulosController],
  providers: [RetornosBancariosService, PrismaService],
})
export class RetornosBancariosModule {}
