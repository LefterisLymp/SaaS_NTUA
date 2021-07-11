import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  
  await app.use(cookieParser());

  app.enableCors({ origin: 'https://frontend-soa.herokuapp.com',
                     credentials: true});
  app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', 'Content-Type, Accept');
  } );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
