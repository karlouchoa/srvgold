import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VendedoresController],
  providers: [VendedoresService, PrismaService],
})
export class VendedoresModule {}
