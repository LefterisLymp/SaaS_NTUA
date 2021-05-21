import { Module } from '@nestjs/common';
import { ServiceBus } from './service.bus';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Question } from './questions/question.entity';
import { Answer } from './answers/answer.entity';
import {QuestionService} from "./services/create_question_service";
import {Keyword_Finder} from "./keyword_finder/keyword_finder.entity";
import {Keyword} from "./keyword/keyword.entity";

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
  ],
  providers: [AppService, QuestionService],
  controllers: [ServiceBus]
})
export class AppModule {}