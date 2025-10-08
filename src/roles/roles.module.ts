import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './controllers/roles.controller';
import { RolesPermissoesController } from './controllers/roles-permissoes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RolesController, RolesPermissoesController],
  providers: [RolesService, PrismaService],
})
export class RolesModule {}
