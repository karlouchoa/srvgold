import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as ErpClient } from '../prisma/generated/erp';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantPrismaManager implements OnModuleDestroy {
  // private clients = new Map<string, ErpClient>();
  private clients = new Map<string, Promise<ErpClient>>();

  // constructor(private config: ConfigService) {}
  constructor(private readonly cfg: ConfigService) {}

  // getClient(dbName: string): ErpClient {
  //   let client = this.clients.get(dbName);
  //   if (!client) {
      
  //     const host = this.config.get<string>('PG_HOST');
  //     const port = this.config.get<string>('PG_PORT');
  //     const user = this.config.get<string>('PG_USER');
  //     const pass = encodeURIComponent(
  //                      this.config.get<string>('PG_PASSWORD') ?? '',
  //                     );
  //     const url  = `postgresql://${user}:${pass}@${host}:${port}/${dbName}`;

  //     client = new ErpClient({ datasources: { db: { url } } });
  //     this.clients.set(dbName, client);
  //   }
  //   return client;
  // }

  getClient(dbName: string): Promise<ErpClient> {
    // memoize promessa, não o client já resolvido → evita corridas
    if (!this.clients.has(dbName)) {
      const clientPromise = this.buildClient(dbName);
      this.clients.set(dbName, clientPromise);
    }
    return this.clients.get(dbName)!;
  }

  private async buildClient(db: string): Promise<ErpClient> {
    const url =
      `postgresql://${this.cfg.get('PG_USER')}:${this.cfg.get('PG_PASSWORD')}` +
      `@${this.cfg.get('PG_HOST')}:${this.cfg.get('PG_PORT')}/${db}`;
    const client = new ErpClient({
      datasources: { db: { url } },
      log: ['warn'],
    });
    await client.$connect();
    return client;
  }
  
  // async onModuleDestroy() {
  //   await Promise.all([...this.clients.values()].map(c => c.$disconnect()));
  // }

  async onModuleDestroy() {
    const resolved = await Promise.all(this.clients.values());
    await Promise.all(resolved.map(c => c.$disconnect()));
  }
  
}
