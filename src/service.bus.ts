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
  BadRequestException, Res
} from '@nestjs/common';
import {QuestionService} from "./services/create_question_service";
import {CreateQuestionDto} from "./questions/create.question.dto";
import {Question} from "./questions/question.entity";
import {CreateAnswerDto} from "./answers/create.answer.dto";
import {Answer} from "./answers/answer.entity";
import {AnswerService} from "./services/create_answer_service";
import { UpdateAnswerDto } from "./answers/update.answer.dto";
import { User } from './users/user.entity';
import { UpdateQuestionDto } from './questions/update.question.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import {AuthService} from "./services/auth_service";
import {Search_question_service} from "./services/search_question_service";
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ServiceBus {
  constructor(private readonly questionService: QuestionService,
              private readonly answerService: AnswerService,
              private readonly authService: AuthService,
              private searchService: Search_question_service,
              private jwtServise: JwtService,
              ) {}

  @Post('api/register')
  async register(
      @Body('username') username: string,
      @Body('first_name') first_name: string,
      @Body('last_name') last_name: string,
      @Body('hashed_password') hashed_password: string,
      @Body('role') role: string,
  ){
      const hashedPassword = await bcrypt.hash(hashed_password,12);

      const user = await this.authService.create({
        username,
        first_name,
        last_name,
        hashed_password: hashedPassword,
        role
      });

    delete user.hashed_password;
    return user;
  }

  @Post('api/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ){
    const user = await this.authService.findOne({username})
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    if(!await bcrypt.compare(password, user.hashed_password)){
      throw new BadRequestException('Invalid username or password');
    }
    const jwt = await this.jwtServise.signAsync({id: user.id});
    response.cookie('jwt',jwt,{httpOnly: true});
    return {
      message: 'Successful login'
    };
  }

  @Get('/api/user')
  async user(@Req() request: Request){
    try{
      const cookie = request.cookies['jwt'];
      const data = await this.jwtServise.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const user = await this.authService.findOne({id: data['id']});
      const {hashed_password, ...result} = user;
      return result;
    }
    catch (e){
      throw new UnauthorizedException();
    }
  }

  @Post('api/logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.clearCookie('jwt');
    return {
      message: 'You have loged out'
    }
  }
  
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
  //Search endpoints
  @Get('/api/search')
  searchByKeyword(@Body() keyword): Promise<Question[]> {
    let keyw = keyword
    return this.searchService.search_by_keyword(keyw.keyword);
  }

  @Get('/api/filter/keyword')
  filterByKeyword(@Body() questions, keywords): Promise<Question[]> {
    let questions_array = JSON.parse(questions.toString());
    let keywords_array = JSON.parse(keywords.toString())
    return this.searchService.filter_by_keyword(questions_array, keywords_array)
  }

  @Get('/api/filter/date')
  filterByDate(@Body() questions, from_date, to_date): Promise<Question[]> {
    let questions_array = JSON.parse(questions.toString());
    return this.searchService.filter_by_date(questions_array, from_date, to_date);
  }

}
