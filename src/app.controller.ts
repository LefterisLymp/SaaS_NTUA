import { Post, Inject } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Delete, Res, Req } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis.service';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitMQService: RedisService,
  ) {}

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
    response.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'Successfully logged in.' };
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
    @Body('keywords') keywords,
  ) {
    const questions_array = JSON.parse(questions.toString());
    const keywords_array = JSON.parse(keywords.toString());
    return this.rabbitMQService.send('filter-by-keyword', {
      questions_array: questions_array,
      keywords_array: keywords_array,
    });
  }

  @Get('/api/filter/date')
  async filterByDate(
    @Body('questions') questions,
    @Body('from_date') from_date,
    @Body('to_date') to_date,
  ) {
    const questions_array = JSON.parse(questions.toString());
    return this.rabbitMQService.send('filter-by-date', {
      questions_array: questions_array,
      from_date: from_date,
      to_date: to_date,
    });
  }
}
