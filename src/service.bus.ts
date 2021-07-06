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
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ServiceBus {
  constructor(private readonly questionService: QuestionService,
              private readonly answerService: AnswerService,
              private readonly authService: AuthService,
              private searchService: Search_question_service,
              private jwtServise: JwtService,
              ) {}

  @MessagePattern('register')
  async register(
      @Payload() data: any,
      @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)

    const user = await this.authService.create({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      hashed_password: data.hashed_password,
      role: data.role,
    });

    delete user.hashed_password;
    return user;
  }

  @MessagePattern('login')
  async login(
      @Payload() data: any,
      @Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)

    const user = await this.authService.findOne({username: data.username})
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    if(!await bcrypt.compare(data.password, user.hashed_password)){
      throw new BadRequestException('Invalid username or password');
    }
    const jwt = await this.jwtServise.signAsync({id: user.id});
    return {username: user.username, id: user.id, jwt: jwt};
  }

  @MessagePattern('user')
  async user(@Payload() data: any,
             @Ctx() context: RmqContext){
    try{
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      channel.ack(originalMessage);

      const datas = await this.jwtServise.verifyAsync(data.cookie);
      if(!datas){
        throw new UnauthorizedException();
      }
      const user = await this.authService.findOne({id: datas['id']});
      const {hashed_password, ...result} = user;
      return result;
    }
    catch (e){
      throw new UnauthorizedException();
    }
  }

  @MessagePattern('logout')
  async logout(@Payload() data: any,
               @Ctx() context: RmqContext)
  {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)

    return {message: 'You have logged out'}
  }
  
  @Get()
  getHello(): Promise<string> {
    return this.questionService.getHello();
  }
  //Question endpoints
  @MessagePattern('create-question')
  createQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.CreateQuestion(data.create_question_dto);
  }

  @MessagePattern('view-question')
  //@Get('/api/question/view/:id')
  viewQuestion(@Payload() data: any,
               @Ctx() context: RmqContext): Promise<Question> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.View_by_id(data.id);
  }

  @MessagePattern('update-question')
  updateQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.UpdateQuestion(data.id, data.update_question_dto)
  }

  @MessagePattern('delete-question')
  deleteQuestion(@Payload() data: any,
                 @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.DeleteQuestion(data.id)
  }

  @MessagePattern('question-all')
  getallQuest(@Payload() data: any,
              @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.questionService.getAll()
  }  //End of question endpoints

  //Answer endpoints
  @MessagePattern('create-answer')
  createAnswer (@Payload() data: any,
                @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.answerService.CreateAnswer(data.create_answer_dto);
  }

  @MessagePattern('update-answer')
  updateAnswer (@Payload() data: any,
                @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.answerService.UpdateAnswer(data.id, data.update_answer_dto);
  }

  @MessagePattern('increment-counter')
  incrementCounter(@Payload() data: any,
                   @Ctx() context: RmqContext): Promise<Answer> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.answerService.IncrementMark(data.id);
  }

  @MessagePattern('delete-answer')
  deleteAnswer(@Payload() data: any,
               @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.answerService.DeleteAnswer(data.id);
  }
  //End of answer endpoints
  //Search endpoints
  @MessagePattern('search-by-keyword')
  searchByKeyword(@Payload() data: any,
                  @Ctx() context: RmqContext): Promise<Question[]> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    let keyw = data.keyword
    return this.searchService.search_by_keyword(keyw.keyword);
  }

  @MessagePattern('filter-by-keyword')
  filterByKeyword(@Payload() data: any,
                  @Ctx() context: RmqContext): Promise<Question[]> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.searchService.filter_by_keyword(data.questions_array, data.keywords_array)
  }

  @MessagePattern('filter-by-date')
  filterByDate(@Payload() data: any,
               @Ctx() context: RmqContext): Promise<Question[]> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage)
    return this.searchService.filter_by_date(data.questions_array, data.from_date, data.to_date);
  }

}
