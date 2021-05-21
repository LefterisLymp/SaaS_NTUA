import { Controller, Get, Post, Body } from '@nestjs/common';
import {QuestionService} from "./services/create_question_service";
import {CreateQuestionDto} from "./questions/create.question.dto";

@Controller()
export class ServiceBus {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getHello(): Promise<string> {
    return this.questionService.getHello();
  }

  @Post('/questions')
  createQuestion(@Body() createquestiondto: CreateQuestionDto) {
    return this.questionService.CreateQuestion(createquestiondto);
  }
}