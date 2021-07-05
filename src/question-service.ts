import { Question } from './questions/question.entity';
import { Keyword } from './keyword/keyword.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateQuestionDto } from './questions/create.question.dto';
import { UpdateQuestionDto } from './questions/update.question.dto';
import { NotFoundException } from '@nestjs/common';
import { Keyword_Finder } from './keyword_finder/keyword_finder.entity';
import { Answer } from './answers/answer.entity';

export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async getHello(): Promise<string> {
    return 'Hello! Questions only.';
  }

  async CreateQuestion(
    create_question_dto: CreateQuestionDto,
  ): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      create_question_dto.keywords = JSON.parse(
        create_question_dto.keywords.toString(),
      );
      for (let i = 0; i < create_question_dto.keywords.length; i++) {
        const keyw = await this.manager.findOne(Keyword, {
          keyword: create_question_dto.keywords[i],
        });
        if (!keyw) {
          const keyw = await this.manager.create(Keyword, {
            keyword: create_question_dto.keywords[i],
          });
          await this.manager.save(keyw);
        }
      }
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
      create_question_dto['asked_on'] = date;
      /*--------*/
      let question = await this.manager.create(Question, create_question_dto);
      question.keywords = create_question_dto['keywords'];
      question = await this.manager.save(question);
      for (let i = 0; i < create_question_dto.keywords.length; i++) {
        const keyword_finder = await this.manager.create(Keyword_Finder, {
          keyword: create_question_dto.keywords[i],
          question_id: question.id,
        });
        await this.manager.save(keyword_finder);
      }
      return question;
    });
  }

  async UpdateQuestion(
    id: number,
    update_question_dto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      const question = await this.manager.findOne(Question, id);
      if (!question) throw new NotFoundException('Question ${id} not found.');
      update_question_dto.keywords = JSON.parse(
        update_question_dto.keywords.toString(),
      );
      for (let i = 0; i < update_question_dto.keywords.length; i++) {
        const keyw = await this.manager.findOne(Keyword, {
          keyword: update_question_dto.keywords[i],
        });
        if (!keyw) {
          const keyw = await this.manager.create(Keyword, {
            keyword: update_question_dto.keywords[i],
          });
          await this.manager.save(keyw);
        }
      }
      await this.manager.delete(Keyword_Finder, { question_id: question.id });
      console.log(update_question_dto);
      const question_upd = this.manager.merge(
        Question,
        question,
        update_question_dto,
      );
      await console.log(question_upd.id);
      for (let i = 0; i < update_question_dto.keywords.length; i++) {
        console.log(update_question_dto.keywords[i]);
        const keyword_finder = await this.manager.create(Keyword_Finder, {
          keyword: update_question_dto.keywords[i],
          question_id: question_upd.id,
        });
        await this.manager.save(keyword_finder);
      }
      for (const i in question_upd) {
        console.log(i, question_upd[i]);
      }
      question_upd['keywords'] = update_question_dto['keywords'];
      await this.manager.save(Question, question_upd);
      return question_upd;
    });
  }

  async DeleteQuestion(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const question = await this.manager.findOne(Question, id);
      if (!question) throw new NotFoundException('Question ${id} not found.');
      await manager.delete(Keyword_Finder, { question_id: question.id });
      await manager.delete(Question, id);
    });
  }

  async View_by_id(id: number): Promise<Question> {
    // @ts-ignore
    //return await this.manager.findBy
    return await this.manager.transaction(async (manager) => {
      let question = new Question();
      let quest;
      quest = [];
      // @ts-ignore
      quest = await this.manager.findByIds(Question, [id]);
      if (quest.length == 0) {
        throw new NotFoundException('Question ${id} not found.');
      }
      question = quest[0];
      let keywords: string[];
      keywords = [];
      const keyword_finders = await this.manager.find(Keyword_Finder, {
        question_id: id,
      });
      for (let i = 0; i < keyword_finders.length; i++) {
        keywords.push(keyword_finders[i]['keyword']);
      }
      question['keywords'] = keywords;
      let answers = await this.manager.find(Answer, { question_id: id });
      // @ts-ignore
      answers = answers.sort((a, b) => b.answered_on - a.answered_on);
      question['answers'] = answers;
      return question;
    });
  }

  async getAll() {
    return this.manager.find(Question);
  }
}
