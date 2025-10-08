import { Module } from '@nestjs/common';
import { CaixaAberturasService } from './caixa-aberturas.service';
import { CaixaAberturasController } from './caixa-aberturas.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CaixaAberturasController],
  providers: [CaixaAberturasService, PrismaService],
})
export class CaixaAberturasModule {}
