import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { Question } from './questions/question.entity';
import { Search_question_service } from './question.stats.service';

@Controller()
export class AppController {
  constructor(
    private readonly searchService: Search_question_service,
  ) {}

  @MessagePattern('search-by-keyword')
  searchByKeyword(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<Question[]> {
    const keyw = data.keyword;
    return this.searchService.search_by_keyword(keyw.keyword);
  }

  @MessagePattern('filter-by-keyword')
  filterByKeyword(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<Question[]> {
    return this.searchService.filter_by_keyword(
      data.questions_array,
      data.keywords_array,
    );
  }

  @MessagePattern('filter-by-date')
  filterByDate(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ): Promise<Question[]> {
    return this.searchService.filter_by_date(
      data.questions_array,
      data.from_date,
      data.to_date,
    );
  }
}
