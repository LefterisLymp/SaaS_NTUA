import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisService } from './redis.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
