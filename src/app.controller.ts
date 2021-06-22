import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {QuestionService} from "./services/create_question_service";
import {CreateQuestionDto} from "./questions/create.question.dto";
import {Question} from "./questions/question.entity";
import { UpdateQuestionDto } from './questions/update.question.dto';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly questionService: QuestionService) {}

  @MessagePattern('create-question')
  createQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.CreateQuestion(data.create_question_dto);
  }

  @MessagePattern('view-question')
  //@Get('/api/question/view/:id')
  viewQuestion(@Payload() data: any,
               @Ctx() context: RmqContext): Promise<Question> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.View_by_id(data.id);
  }

  @MessagePattern('update-question')
  updateQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.UpdateQuestion(data.id, data.update_question_dto)
  }

  @MessagePattern('delete-question')
  deleteQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.DeleteQuestion(data.id)
  }
}
