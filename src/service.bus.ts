import {Controller, Get, Post, Body, Param, ParseIntPipe, Delete} from '@nestjs/common';
import {QuestionService} from "./services/create_question_service";
import {CreateQuestionDto} from "./questions/create.question.dto";
import {Question} from "./questions/question.entity";
import {UpdateQuestionDto} from "./questions/update.question.dto";
import {CreateAnswerDto} from "./answers/create.answer.dto";
import {Answer} from "./answers/answer.entity";
import {AnswerService} from "./services/create_answer_service";
import { UpdateAnswerDto } from "./answers/update.answer.dto";

@Controller()
export class ServiceBus {
  constructor(private readonly questionService: QuestionService,
              private readonly answerService: AnswerService) {}

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
  //End of question endpoints

  //Answer endpoints
  @Post('/api/answer/create')
  createAnswer (@Body() createanswerdto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.CreateAnswer(createanswerdto);
  }

  @Post('/api/answer/update/:id')
  updateAnswer (@Param('id', new ParseIntPipe()) id, @Body() updateanswerdto: UpdateAnswerDto): Promise<Answer> {
    return this.answerService.UpdateAnswer(id, updateanswerdto);
  }

  @Post('/api/answer/increment/:id')
  incrementCounter(@Param('id', new ParseIntPipe()) id): Promise<Answer> {
    return this.answerService.IncrementMark(id);
  }

  @Delete('/api/answer/delete/:id')
  deleteAnswer(@Param('id', new ParseIntPipe()) id): Promise<void> {
    return this.answerService.DeleteAnswer(id);
  }
  //End of answer endpoints

}