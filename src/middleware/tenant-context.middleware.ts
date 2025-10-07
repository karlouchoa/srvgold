// tenant-context.middleware.ts
import {
  Injectable, NestMiddleware, BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaClient } from 'prisma/generated/erp';

import { PrismaService } from '../prisma.service';        // client fixo (main)
import { TenantPrismaManager } from '../tenant-prisma.manager';

export interface RequestWithPrisma extends Request {
  tenantClient: PrismaClient;   // ✔️ tipo real
  tenantId: number;
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(
    private readonly mainPrisma: PrismaService,
    private readonly prismaManager: TenantPrismaManager,
  ) {}

  async use(req: RequestWithPrisma, _res: Response, next: NextFunction) {
     // 1️⃣ tenta header
  let slug = (req.headers['x-tenant'] as string) ?? '';

  // 2️⃣ se header ausente, tenta subdomínio
  if (!slug) {
    const host = req.hostname;           // ex.: lojax.goldpdv.local
    slug = host.split('.')[0];           // lojax
  }

  if (!slug) {
    throw new BadRequestException('Slug do tenant não informado (header x-tenant ou subdomínio)');
  }

  const tenant = await this.mainPrisma.tenant.findUnique({ where: { slug } });
  if (!tenant) {
    throw new BadRequestException('Tenant inexistente');
  }

  req.tenantId = tenant.id;
  req.tenantClient = await this.prismaManager.getClient(tenant.db_name);
  next();
  }
}
