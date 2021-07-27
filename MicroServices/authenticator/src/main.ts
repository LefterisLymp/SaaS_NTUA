import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis-11164.c261.us-east-1-4.ec2.cloud.redislabs.com:11164',
        password: '0SszVK5yEnQwHqyJxXIdrAAhJmhnOEBY',
      },
    },
  );
  app.listen(() => console.log('Authentication microservice is listening'));
}
bootstrap();
