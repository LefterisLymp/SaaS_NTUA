import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword_Finder } from './keyword_finder/keyword_finder.entity';
import { Answer } from './answers/answer.entity';
import { Keyword } from './keyword/keyword.entity';
import { Question } from './questions/question.entity';
import { QuestionService } from './question-service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [Question, Keyword, Keyword_Finder, Answer],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [QuestionService],
})
export class AppModule {}
