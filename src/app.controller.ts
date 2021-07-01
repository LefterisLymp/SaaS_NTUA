import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth_service';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtServise: JwtService,
  ) {}

  @MessagePattern('register')
  async register(@Payload() data: any, @Ctx() context: RedisContext) {

    const user = await this.authService.create({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      hashed_password: data.hashed_password,
      role: data.role,
    });

    delete user.hashed_password;
    return user;
  }

  @MessagePattern('login')
  async login(@Payload() data: any, @Ctx() context: RedisContext) {

    const user = await this.authService.findOne({ username: data.username });
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    if (!(await bcrypt.compare(data.password, user.hashed_password))) {
      throw new BadRequestException('Invalid username or password');
    }
    const jwt = await this.jwtServise.signAsync({ id: user.id });
    return jwt;
  }

  @MessagePattern('user')
  async user(@Payload() data: any, @Ctx() context: RedisContext) {
    try {

      const datas = await this.jwtServise.verifyAsync(data.cookie);
      if (!datas) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.findOne({ id: datas['id'] });
      const { hashed_password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @MessagePattern('logout')
  async logout(@Payload() data: any, @Ctx() context: RedisContext) {
    return { message: 'You have logged out' };
  }
}
