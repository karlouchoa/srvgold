import { Injectable, BadRequestException, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
// export class TenantsService {
export class TenantsService implements OnModuleDestroy {
  private adminConn: string;
  private template: string;
  private adminPool: Pool;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const host = this.config.getOrThrow<string>('PG_HOST');
    const port = parseInt(this.config.getOrThrow<string>('PG_PORT'), 10);
    const user = this.config.getOrThrow<string>('PG_USER');
    const pass = this.config.getOrThrow<string>('PG_PASSWORD');
    const superDb = this.config.get<string>('PG_SUPER_DB') ?? 'postgres';

    this.adminPool = new Pool({
      host,
      port,
      user,
      password: pass,
      database: superDb,
    });

    this.template = this.config.get<string>('PG_TEMPLATE') ?? 'goldpdv';
  }

  /**
   * Cria um novo tenant clonando o template definido em .env
   * @param dto { name, slug }
   */
  async createTenant(dto: { name: string; slug: string }) {
    const name = dto.name?.trim();
    if (!name) {
      throw new BadRequestException('Nome nao pode ser vazio');
    }

    const rawSlug = dto.slug?.trim();
    if (!rawSlug) {
      throw new BadRequestException('Slug nao pode ser vazio');
    }

    const slug = rawSlug.toLowerCase();
    const safeSlug = slug.replace(/[^a-z0-9_]/g, '_');

    if (!safeSlug) {
      throw new BadRequestException('Slug informado gera um nome de banco invalido');
    }

    const dbName = `tenant_${safeSlug}`;

    // 1) evita slug duplicado
    const exists = await this.prisma.tenant.findFirst({
      where: { OR: [{ slug }, { db_name: dbName }] },
    });
    if (exists) {
      throw new BadRequestException('Slug ja em uso');
    }

    // 2) cria banco fisico via driver pg
    const sql =
      `CREATE DATABASE "${dbName}" WITH TEMPLATE "${this.template}" OWNER ${this.config.get('PG_USER')};`;

    try {
      await this.adminPool.query(sql);
    } catch (e) {
      throw new Error(`Falha ao criar banco ${dbName}: ${(e as Error).message}`);
    }

    // 3) registra no banco main
    return this.prisma.tenant.create({
      data: { name, slug, db_name: dbName },
    });
  }

  async onModuleDestroy() {
    await this.adminPool?.end(); // fecha conexoes pendentes
  }
}
