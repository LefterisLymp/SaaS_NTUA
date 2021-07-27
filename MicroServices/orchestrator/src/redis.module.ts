import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'q2a',
        transport: Transport.REDIS,
        options: {
          url: 'redis://redis-11164.c261.us-east-1-4.ec2.cloud.redislabs.com:11164',
          password: '0SszVK5yEnQwHqyJxXIdrAAhJmhnOEBY',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
