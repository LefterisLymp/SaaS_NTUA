import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth_service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SeCrEtKeYWOWSuperSecret',
      signOptions: { expiresIn: '1h' },
    })],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
