import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* â”€â”€â”€ NOVOS IMPORTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { TenantPrismaManager } from './tenant-prisma.manager';
import { TenantContextMiddleware } from './middleware/tenant-context.middleware';
import { TenantsService } from './tenants/tenants.service';


/* (separado por clareza) â€” seus mÃ³dulos de domÃ­nio       */
/* import { TenantsModule } from './tenants/tenants.module'; */
/* import { ProductsModule } from './products/products.module'; */
import { TenantsModule } from './tenants/tenants.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BancoModule } from './banco/banco.module';
import { CaixaAberturasModule } from './caixa-aberturas/caixa-aberturas.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ItensModule } from './itens/itens.module';
import { ClienteModule } from './cliente/cliente.module';
import { VendedoresModule } from './vendedores/vendedores.module';
import { VendasModule } from './vendas/vendas.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { UnidadesMedidaModule } from './unidades-medida/unidades-medida.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { ClassificacaoModule } from './classificacao/classificacao.module';
import { RolesModule } from './roles/roles.module';
import { RetornosBancariosModule } from './retornos-bancarios/retornos-bancarios.module';
import { RequisicoesModule } from './requisicoes/requisicoes.module';

@Module({
  /*  imports: [TenantsModule, ProductsModule], */
  imports: [ConfigModule.forRoot({ isGlobal: true }), TenantsModule, UsuariosModule, BancoModule, CaixaAberturasModule, 
            EmpresaModule, ItensModule, ClienteModule, VendedoresModule, VendasModule, VeiculosModule, 
            UnidadesMedidaModule, PagamentosModule, ClassificacaoModule, RolesModule, RetornosBancariosModule, 
            RequisicoesModule],   // â‘ 
  controllers: [AppController],
  providers: [
    AppService,
    /* â”€ Providers globais que adicionamos â”€ */
    PrismaService,
    TenantPrismaManager,
    TenantsService,
  ],
  /* Se outro mÃ³dulo precisar de PrismaService /
     TenantPrismaManager basta manter o exports,
     mas nÃ£o Ã© obrigatÃ³rio nesta fase inicial. */
  exports: [PrismaService, TenantPrismaManager],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(TenantContextMiddleware)
      .exclude(
        { path: 'tenants', method: RequestMethod.POST },  // cria novo tenant
      )
      .forRoutes('*');
  }
}


