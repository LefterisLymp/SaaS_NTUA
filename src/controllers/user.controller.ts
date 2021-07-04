import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Req,
  BadRequestException,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth_service';

@Controller()
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private jwtServise: JwtService,
  ) {}

  @Post('api/register')
  async register(
    @Body('username') username: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('hashed_password') hashed_password: string,
    @Body('role') role: string,
  ) {
    const hashedPassword = await bcrypt.hash(hashed_password, 12);

    const user = await this.authService.create({
      username,
      first_name,
      last_name,
      hashed_password: hashedPassword,
      role,
    });

    delete user.hashed_password;
    return user;
  }

  @Post('api/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    if (!(await bcrypt.compare(password, user.hashed_password))) {
      throw new BadRequestException('Invalid username or password');
    }
    const jwt = await this.jwtServise.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Successful login',
    };
  }

  @Get('/api/user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtServise.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.findOne({ id: data['id'] });
      const { hashed_password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('api/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'You have loged out',
    };
  }
}
