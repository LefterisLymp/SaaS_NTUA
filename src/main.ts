import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use(cookieParser());
  await app.listen(process.env.port || 3000);
}
bootstrap();
