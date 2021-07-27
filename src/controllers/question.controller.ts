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

  @Get('api/question/all')
  getAll() {
    return this.questionService.getAll();
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
  searchByKeyword(@Body('keyword') keyword: string): Promise<Question[]> {
    return this.searchService.search_by_keyword(keyword);
  }

  @Get('/api/filter/keyword')
  filterByKeyword(@Body('questions') questions,
                  @Body('keyword') keyword: string,): Promise<Question[]> {
    const questions_array = JSON.parse(questions.toString());
    return this.searchService.filter_by_keyword(
      questions_array,
      keyword
    );
  }

  @Post('/api/search/date')
  async filterByDate(
    @Body('from_date') from_date,
    @Body('to_date') to_date,
  ) {
    return this.searchService.search_by_date(from_date, to_date)
  }

  @Get('api/search/user_id/:id')
  async q_a_byid(@Param('id', new ParseIntPipe()) id) {
    return this.searchService.QAperUserid(id);
  }

  @Get('api/search/day')
  async q_a_byday() {
    return this.searchService.QAperDay();
  }

  @Get('api/search/questions_per_keyword')
  async q_per_keyword() {
    return this.searchService.questions_keyword();
  }

  @Get('api/search/postings/:id')
  async postings_per_day(@Param('id', new ParseIntPipe()) id) {
    return this.searchService.postings_per_day(id);
  }
}
}
