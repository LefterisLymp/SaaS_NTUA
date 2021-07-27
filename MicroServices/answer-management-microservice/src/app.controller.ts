import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerService } from './create_answer_service';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { Answer } from './answers/answer.entity';

@Controller()
export class AppController {
  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('create-answer')
  createAnswer(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.answerService.CreateAnswer(data.create_answer_dto);
  }

  @MessagePattern('update-answer')
  updateAnswer(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.answerService.UpdateAnswer(data.id, data.update_answer_dto);
  }

  @MessagePattern('increment-counter')
  incrementCounter(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<Answer> {
    return this.answerService.IncrementMark(data.id);
  }

  @MessagePattern('delete-answer')
  deleteAnswer(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<void> {
    return this.answerService.DeleteAnswer(data.id);
  }
}
