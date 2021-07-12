import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  //const app = await NestFactory.create(AppModule)
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://vatnlvqb:IEY1WBGLm5F6_4QyZOGcYXjOxG2lRpUV@cow.rmq2.cloudamqp.com/vatnlvqb'
      ],
      queue: 'rabbit-mq-nest-js',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
    }
  });
  await app.listen(() => {console.log("Backend is listening.")})
}
bootstrap();
