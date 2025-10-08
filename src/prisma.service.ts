import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as MainClient } from '@prisma/client';
import { PrismaClient as ErpClient } from '../prisma/generated/erp';

@Injectable()
export class PrismaService
  extends ErpClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly mainClient: MainClient;

  constructor() {
    super();
    this.mainClient = new MainClient();
  }

  get tenant(): MainClient['tenant'] {
    return this.mainClient.tenant;
  }

  async onModuleInit() {
    await Promise.all([this.$connect(), this.mainClient.$connect()]);
  }

  async onModuleDestroy() {
    await Promise.all([this.$disconnect(), this.mainClient.$disconnect()]);
  }
}
