import { execSync } from 'child_process';
import * as path from 'path';
import * as chalk from 'chalk';                       // ✅  default import (chalk@4 ou esModuleInterop)

import { PrismaClient as MainClient } from '@prisma/client';   // client do DB main

/* caminho absoluto do schema ERP */
const ERP_SCHEMA = path.join(__dirname, '../prisma/erp.prisma');

/* parte fixa da URL de conexão */
const BASE_URL = process.env.BASE_PG_URL                                   // ex.: postgresql://user:pass@host:15532
  ?? 'postgresql://user:pass@103.199.184.26:15532';                        // fallback (ajuste se precisar)

async function migrateAllTenants(): Promise<void> {
  const main = new MainClient();

  try {
    /* 1) obter lista de bancos físicos */
    const tenants = await main.tenant.findMany({ select: { db_name: true } });
    console.log(chalk.cyan(`• Encontrados ${tenants.length} tenants`));

    /* 2) iterar sobre cada banco */
    for (const { db_name } of tenants) {
      const dbUrl = `${BASE_URL}/${db_name}`;
      process.env.ERP_TEMPLATE_URL = dbUrl;              // <- Prisma CLI usará esta variável!

      try {
        console.log(chalk.yellow(`→ Migrando ${db_name} ...`));

        // execSync(
        //   `npx prisma migrate deploy --schema=${ERP_SCHEMA}`,
        //   { stdio: 'inherit' },                          // mostra log do Prisma
        // );

        execSync(
            `npx prisma db push --schema=${ERP_SCHEMA} --accept-data-loss`,
            { stdio: 'inherit' },
        );

        console.log(chalk.green(`✓ ${db_name} atualizado`));
      } catch (err) {
        console.error(
          chalk.red(`✗ Falha em ${db_name}: ${(err as Error).message}`),
        );
      }
    }
  } finally {
    await main.$disconnect();
  }
}

migrateAllTenants().catch((e) => {
  console.error(e);
  process.exit(1);
});
