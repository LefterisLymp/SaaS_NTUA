import { Post, Inject } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Delete, Res, Req } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbit-mq.service';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/register')
  async register(
    @Body('username') username: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('hashed_password') hashed_password: string,
    @Body('role') role: string,
  ) {
    const hashedPassword = await bcrypt.hash(hashed_password, 12);

    return await this.rabbitMQService.send('register', {
      username: username,
      first_name: first_name,
      last_name: last_name,
      hashed_password: hashedPassword,
      role: role,
    });
  }

  @Post('api/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response,
  ) {
    let jwt;
    try {
      jwt = await this.rabbitMQService.send('login', {
        username: username,
        password: password,
      });
      if (!jwt) return;
    } catch (err) {
      return { exception: err };
    }
    response.cookie('jwt', jwt.jwt, { httpOnly: true });
    return { username: jwt.username, id: jwt.id };
  }

  @Get('/api/user')
  async user(@Req() request) {
    const cookie = request.cookies['jwt'];
    try {
      return this.rabbitMQService.send('user', {
        cookie: cookie,
      });
    } catch (err) {
      return { exception: err };
    }
  }

  @Post('api/logout')
  async logout(@Res({ passthrough: true }) response) {
    response.clearCookie('jwt');
    return this.rabbitMQService.send('logout', {});
  }

  //Question endpoints
  @Post('/api/question/create')
  async createQuestion(@Body() createquestiondto: any) {
    return this.rabbitMQService.send('create-question', {
      create_question_dto: createquestiondto,
    });
  }

  @Get('/api/question/view/:id')
  async viewQuestion(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('view-question', {
      id: id,
    });
  }

  @Post('/api/question/update/:id')
  async updateQuestion(
    @Param('id', new ParseIntPipe()) id,
    @Body() updatequestiondto: any,
  ) {
    return this.rabbitMQService.send('update-question', {
      id: id,
      update_question_dto: updatequestiondto,
    });
  }

  @Delete('/api/question/delete/:id')
  async deleteQuestion(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('delete-question', {
      id: id,
    });
  }

  @Get('api/question/all')
  async getAllQuestions() {
    return this.rabbitMQService.send('question-all', {});
  }

  //End of question endpoints

  //Answer endpoints
  @Post('/api/answer/create')
  async createAnswer(@Body() createanswerdto: any) {
    return this.rabbitMQService.send('create-answer', {
      create_answer_dto: createanswerdto,
    });
  }

  @Post('/api/answer/update/:id')
  async updateAnswer(
    @Param('id', new ParseIntPipe()) id,
    @Body() updateanswerdto: any,
  ) {
    return this.rabbitMQService.send('update-answer', {
      id: id,
      update_answer_dto: updateanswerdto,
    });
  }

  @Post('/api/answer/increment/:id')
  async incrementCounter(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('increment-counter', {
      id: id,
    });
  }

  @Delete('/api/answer/delete/:id')
  async deleteAnswer(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('delete-answer', {
      id: id,
    });
  }

  //End of answer endpoints
  //Search endpoints
  @Get('/api/search')
  async searchByKeyword(@Body('keyword') keyword: string) {
    return this.rabbitMQService.send('search-by-keyword', {
      keyword: keyword,
    });
  }

  @Get('/api/filter/keyword')
  async filterByKeyword(
    @Body('questions') questions,
    @Body('keyword') keyword: string,
  ) {
    const questions_array = JSON.parse(questions.toString());
    return this.rabbitMQService.send('filter-by-keyword', {
      questions_array: questions_array,
      keywords_array: keyword,
    });
  }

  @Get('/api/search/date')
  async filterByDate(
    @Body('from_date') from_date,
    @Body('to_date') to_date,
  ) {
    return this.rabbitMQService.send('filter-by-date', {
      from_date: from_date,
      to_date: to_date,
    });
  }

  @Get('api/search/user_id/:id')
  async q_a_byid(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('q&a-by-id', {
      id: id,
    });
  }

  @Get('api/search/day')
  async q_a_byday() {
    return this.rabbitMQService.send('q&a-by-day', {});
  }

  @Get('api/search/questions_per_keyword')
  async q_per_keyword() {
    return this.rabbitMQService.send('questions_per_keyword', {});
  }

  @Get('api/search/postings/:id')
  async postings_per_day(@Param('id', new ParseIntPipe()) id) {
    return this.rabbitMQService.send('postings-per-day', { id: id });
  }
}
