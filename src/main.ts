import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use(cookieParser());
  app.enableCors({
    origin: 'https://service-bus.herokuapp.com/',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
