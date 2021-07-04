import { Module } from '@nestjs/common';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/create_question_service';
import { Search_question_service } from '../services/search_question_service';
import { User } from '../models/users/user.entity';
import { Question } from '../models/questions/question.entity';
import { Answer } from '../models/answers/answer.entity';
import { Keyword_Finder } from '../models/keyword_finder/keyword_finder.entity';
import { Keyword } from '../models/keyword/keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'conn1',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [Question, Answer, Keyword_Finder, Keyword],
      synchronize: true,
    }),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, Search_question_service],
  exports: [QuestionService, Search_question_service],
})
export class QuestionModule {}
