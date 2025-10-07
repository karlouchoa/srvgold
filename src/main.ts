import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // (opcional) habilite CORS para facilitar testes em localhost
 app.enableCors();

 await app.listen(process.env.PORT ?? 3000);
 console.log(`API on http://localhost:${process.env.PORT ?? 3000}`);

}
bootstrap();
