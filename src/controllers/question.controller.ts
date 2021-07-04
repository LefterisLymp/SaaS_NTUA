import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  UnauthorizedException,
  Req,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { QuestionService } from '../services/create_question_service';
import { CreateQuestionDto } from '../models/questions/create.question.dto';
import { Question } from '../models/questions/question.entity';
import { UpdateQuestionDto } from '../models/questions/update.question.dto';
import { Search_question_service } from '../services/search_question_service';

@Controller()
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private searchService: Search_question_service,
  ) {}

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
  updateQuestion(
    @Param('id', new ParseIntPipe()) id,
    @Body() updatequestiondto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.UpdateQuestion(id, updatequestiondto);
  }

  @Delete('/api/question/delete/:id')
  deleteQuestion(@Param('id', new ParseIntPipe()) id): Promise<void> {
    return this.questionService.DeleteQuestion(id);
  }

  @Get('/api/search')
  searchByKeyword(@Body() keyword): Promise<Question[]> {
    const keyw = keyword;
    return this.searchService.search_by_keyword(keyw.keyword);
  }

  @Get('/api/filter/keyword')
  filterByKeyword(@Body() questions, keywords): Promise<Question[]> {
    const questions_array = JSON.parse(questions.toString());
    const keywords_array = JSON.parse(keywords.toString());
    return this.searchService.filter_by_keyword(
      questions_array,
      keywords_array,
    );
  }

  @Get('/api/filter/date')
  filterByDate(@Body() questions, from_date, to_date): Promise<Question[]> {
    const questions_array = JSON.parse(questions.toString());
    return this.searchService.filter_by_date(
      questions_array,
      from_date,
      to_date,
    );
  }
}
