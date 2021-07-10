import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.use(cookieParser());
  await app.use(cors());
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
