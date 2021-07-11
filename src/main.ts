import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use(cookieParser());
  app.enableCors({ origin: 'https://frontend-soa.herokuapp.com' });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
