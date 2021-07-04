import { Module } from '@nestjs/common';
import { AnswerController } from '../controllers/answer.controller';
import { AnswerService } from '../services/create_answer_service';
import { User } from '../models/users/user.entity';
import { Question } from '../models/questions/question.entity';
import { Answer } from '../models/answers/answer.entity';
import { Keyword_Finder } from '../models/keyword_finder/keyword_finder.entity';
import { Keyword } from '../models/keyword/keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'conn2',
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
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
