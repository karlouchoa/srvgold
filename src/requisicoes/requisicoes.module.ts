import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RequisicoesService } from './requisicoes.service';
import { RequisicoesCompraController } from './controllers/requisicoes-compra.controller';
import { RequisicoesEstoqueController } from './controllers/requisicoes-estoque.controller';
import { RequisicaoItensController } from './controllers/requisicao-itens.controller';

@Module({
  controllers: [
    RequisicoesCompraController,
    RequisicoesEstoqueController,
    RequisicaoItensController,
  ],
  providers: [RequisicoesService, PrismaService],
})
export class RequisicoesModule {}
