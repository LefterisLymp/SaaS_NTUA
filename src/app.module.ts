import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceBus } from './service.bus';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Question } from './questions/question.entity';
import { Answer } from './answers/answer.entity';
import {QuestionService} from "./services/create_question_service";
import {Keyword_Finder} from "./keyword_finder/keyword_finder.entity";
import {Keyword} from "./keyword/keyword.entity";
import {AnswerService} from "./services/create_answer_service";
import { AuthService } from './services/auth_service';
import { JwtModule } from "@nestjs/jwt";
import {Search_question_service} from "./services/search_question_service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://b40e3a905198a6:2fcfd8be@us-cdbr-east-04.cleardb.com/heroku_29acbb2f2749f8a?reconnect=true',
      entities: [User, Question, Answer, Keyword_Finder, Keyword],
      synchronize: true,
      cache: true
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SeCrEtKeYWOWSuperSecret',
      signOptions: {expiresIn: '1h'}
    }),
    ClientsModule.register([{
      name: 'rabbit-mq-module',
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://vatnlvqb:IEY1WBGLm5F6_4QyZOGcYXjOxG2lRpUV@cow.rmq2.cloudamqp.com/vatnlvqb'
        ],
        queue: 'rabbit-mq-nest-js',
        // false = manual acknowledgement; true = automatic acknowledgment
        noAck: false,
        // Get one by one
        prefetchCount: 1,
        queueOptions: {
          durable: true,
        }
      }}])
  ],
  providers: [AppService, QuestionService, AnswerService, AuthService, Search_question_service],
  controllers: [ServiceBus]
})
export class AppModule {}
