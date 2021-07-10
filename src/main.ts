import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ClientsModule, MicroserviceOptions, Transport} from '@nestjs/microservices';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// Then combine it with your microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
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
    }});

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3001);

}
bootstrap();
