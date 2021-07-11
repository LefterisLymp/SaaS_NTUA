import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
  app.enableCors({ origin: 'https://frontend-soa.herokuapp.com' });
}
bootstrap();
