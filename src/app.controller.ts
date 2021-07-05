import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { QuestionService } from './question-service';
import { CreateQuestionDto } from './questions/create.question.dto';
import { Question } from './questions/question.entity';
import { UpdateQuestionDto } from './questions/update.question.dto';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly questionService: QuestionService) {}

  @MessagePattern('create-question')
  createQuestion(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.questionService.CreateQuestion(data.create_question_dto);
  }

  @MessagePattern('view-question')
  //@Get('/api/question/view/:id')
  viewQuestion(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<Question> {
    return this.questionService.View_by_id(data.id);
  }

  @MessagePattern('update-question')
  updateQuestion(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.questionService.UpdateQuestion(
      data.id,
      data.update_question_dto,
    );
  }

  @MessagePattern('delete-question')
  deleteQuestion(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.questionService.DeleteQuestion(data.id);
  }

  @MessagePattern('question-all')
  getallQuest(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.questionService.getAll();
  }
}
