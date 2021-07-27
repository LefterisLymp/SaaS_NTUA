import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateAnswerDto } from '../models/answers/create.answer.dto';
import { Answer } from '../models/answers/answer.entity';
import { AnswerService } from '../services/create_answer_service';
import { UpdateAnswerDto } from '../models/answers/update.answer.dto';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('/api/answer/create')
  createAnswer(@Body() createanswerdto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.CreateAnswer(createanswerdto);
  }

  @Post('/api/answer/update/:id')
  updateAnswer(
    @Param('id', new ParseIntPipe()) id,
    @Body() updateanswerdto: UpdateAnswerDto,
  ): Promise<Answer> {
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
}
