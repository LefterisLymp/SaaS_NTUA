import { Module } from '@nestjs/common';
import { JwtModule } from 'node_modules/@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './models/answers/answer.entity';
import { Keyword } from './models/keyword/keyword.entity';
import { Keyword_Finder } from './models/keyword_finder/keyword_finder.entity';
import { Question } from './models/questions/question.entity';
import { User } from './models/users/user.entity';
import { AnswerService } from './services/create_answer_service';
import { QuestionService } from './services/create_question_service';
import { AuthService } from './services/auth_service';
import { Search_question_service } from './services/search_question_service';
import { UserController } from './controllers/user.controller';
import { QuestionController } from './controllers/question.controller';
import { AnswerController } from './controllers/answer.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [User, Question, Answer, Keyword_Finder, Keyword],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SeCrEtKeYWOWSuperSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    QuestionService,
    AnswerService,
    AuthService,
    Search_question_service,
  ],
  controllers: [UserController, QuestionController, AnswerController],
})
export class AppModule {}
