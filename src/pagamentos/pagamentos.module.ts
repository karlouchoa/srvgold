// src/pagamentos/pagamentos.module.ts
import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PrismaService } from '../prisma.service';
import { TiposPagamentoController } from './controllers/tipos-pagamento.controller';
import { FormasPagamentoController } from './controllers/formas-pagamento.controller';
import { FormasParcelasController } from './controllers/formas-parcelas.controller';

@Module({
  controllers: [
    TiposPagamentoController,
    FormasPagamentoController,
    FormasParcelasController,
  ],
  providers: [PagamentosService, PrismaService],
})
export class PagamentosModule {}
