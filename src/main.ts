import { NestFactory } from '@nestjs/core';
import { AppModule } from './Items/modules/app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(cors());

  await app.listen(4000);
}
bootstrap();
