import {Question} from '../questions/question.entity'
import {Keyword} from '../keyword/keyword.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import {CreateQuestionDto} from "../questions/create.question.dto";
import {UpdateQuestionDto} from "../questions/update.question.dto";
import {NotFoundException} from "@nestjs/common";
import {Keyword_Finder} from "../keyword_finder/keyword_finder.entity";

export class QuestionService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async getHello(): Promise<string> {return "Hello! Questions only."}

    async CreateQuestion (create_question_dto: CreateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            for (let i = 0; i < create_question_dto.keywords.length; i++) {
                const keyw = await this.manager.findOne(Keyword, {keyword: create_question_dto.keywords[i]});
                if (!keyw)  {
                    const keyw = await this.manager.create(Keyword, {keyword: create_question_dto.keywords[i]});
                    await this.manager.save(keyw);
                }
            }
            const question = await this.manager.create(Question, create_question_dto);
            for (let i = 0; i < create_question_dto.keywords.length; i++) {
                const keyword_finder = await this.manager.create(Keyword_Finder, {keyword:create_question_dto.keywords[i], question_id: question.id});
                this.manager.save(keyword_finder);
            }
            return this.manager.save(question);
        })
    }

    async UpdateQuestion (id: number, update_question_dto: UpdateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const question = await this.manager.findOne(Question, id)
            if (!question) throw new NotFoundException('Question ${id} not found.');
            for (let i = 0; i < update_question_dto.keywords.length; i++) {
                const keyw = await this.manager.findOne(Keyword, {keyword: update_question_dto.keywords[i]})
                if (!keyw) {
                    const keyw = await this.manager.create(Keyword, {keyword: update_question_dto.keywords[i]});
                    await this.manager.save(keyw);
                }
            }
            await this.manager.delete(Keyword_Finder, {question_id: question.id})
            await this.manager.merge(Question, question, update_question_dto);
            for (let i = 0; i < update_question_dto.keywords.length; i++) {
                const keyword_finder = await this.manager.create(Keyword_Finder, {keyword:update_question_dto.keywords[i], question_id: question.id});
                this.manager.save(keyword_finder);
            }
            return this.manager.save(question);
        })
    }

    async DeleteQuestion (id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const question = await this.manager.findOne(Question, id)
            if (!question) throw new NotFoundException('Question ${id} not found.');
            await manager.delete(Keyword_Finder, {question_id: question.id});
            await manager.delete(Question, id);
        })
    }
}