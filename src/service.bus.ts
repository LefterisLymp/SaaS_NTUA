import {Controller, Get, Post, Body, Param, ParseIntPipe, Delete} from '@nestjs/common';
import {QuestionService} from "./services/create_question_service";
import {CreateQuestionDto} from "./questions/create.question.dto";
import {Question} from "./questions/question.entity";
import {UpdateQuestionDto} from "./questions/update.question.dto";

@Controller()
export class ServiceBus {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getHello(): Promise<string> {
    return this.questionService.getHello();
  }
  //Question endpoints
  @Post('/api/question/create')
  createQuestion(@Body() createquestiondto: CreateQuestionDto) {
    return this.questionService.CreateQuestion(createquestiondto);
  }

  @Get('/api/question/view/:id')
  viewQuestion(@Param('id', new ParseIntPipe()) id): Promise<Question> {
    return this.questionService.View_by_id(id);
  }

  @Post('/api/question/update/:id')
  updateQuestion(@Param('id', new ParseIntPipe()) id, @Body() updatequestiondto: UpdateQuestionDto): Promise<Question> {
    return this.questionService.UpdateQuestion(id, updatequestiondto)
  }

  @Delete('/api/question/delete/:id')
  deleteQuestion(@Param('id', new ParseIntPipe()) id): Promise<void> {
    return this.questionService.DeleteQuestion(id)
  }
}