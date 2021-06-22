import { Question } from './questions/question.entity';
import { Answer } from './answers/answer.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAnswerDto } from './answers/create.answer.dto';
import { UpdateAnswerDto } from './answers/update.answer.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async CreateAnswer(create_answer_dto: CreateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const question_id = create_answer_dto.question_id;
      if (!question_id) throw new BadRequestException('Question id missing.');
      const question = await this.manager.findOne(Question, question_id);
      if (!question) throw new NotFoundException('Question ${id} not found.');

      /*Creating the date*/
      let date;
      date = new Date();
      date =
        date.getFullYear() +
        '-' +
        ('00' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + date.getDate()).slice(-2) +
        ' ' +
        ('00' + date.getHours()).slice(-2) +
        ':' +
        ('00' + date.getMinutes()).slice(-2) +
        ':' +
        ('00' + date.getSeconds()).slice(-2);
      create_answer_dto['answered_on'] = date;
      /*--------*/

      const answer = await this.manager.create(Answer, create_answer_dto);
      answer.question = question;
      return this.manager.save(answer);
    });
  }

  async UpdateAnswer(
    id: number,
    update_answer_dto: UpdateAnswerDto,
  ): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const answer = await this.manager.findOne(Answer, id);
      if (!answer) throw new NotFoundException('Answer ${id} not found.');
      this.manager.merge(Answer, answer, update_answer_dto);
      return this.manager.save(answer);
    });
  }

  async IncrementMark(id: number): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const answer = await this.manager.findOne(Answer, id);
      if (!answer) throw new NotFoundException('Answer ${id} not found.');
      answer['mark']++;
      return this.manager.save(Answer, answer);
    });
  }

  async DeleteAnswer(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const answer = await this.manager.findOne(Answer, id);
      if (!answer) throw new NotFoundException('Answer ${id} not found.');
      await this.manager.delete(Answer, id);
    });
  }
}
