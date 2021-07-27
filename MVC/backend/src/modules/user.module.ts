import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { AuthService } from '../services/auth_service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../models/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../models/questions/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [User, Question],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SeCrEtKeYWOWSuperSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
