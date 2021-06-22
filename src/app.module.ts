import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/question.entity';
import { Answer } from './answers/answer.entity';
import { AnswerService } from './create_answer_service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ro0t_KlM1!',
      database: 'saas',
      entities: [Question, Answer],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AnswerService],
})
export class AppModule {}
