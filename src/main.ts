import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use(cookieParser());
  var port_number = server.listen(process.env.PORT || 3000);
  await app.listen(port_number);
}
bootstrap();
