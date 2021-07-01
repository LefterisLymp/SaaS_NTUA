import { Injectable, Inject } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RedisService {
  //private client: ClientProxy;
  constructor(@Inject('q2a') private readonly client: ClientProxy) {
    /*this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis-11164.c261.us-east-1-4.ec2.cloud.redislabs.com:11164',
        password: '0SszVK5yEnQwHqyJxXIdrAAhJmhnOEBY',
      },
    });*/
  }
  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
