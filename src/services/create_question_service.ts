import {Question} from '../questions/question.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import {CreateQuestionDto} from "../questions/create.question.dto";
import {UpdateQuestionDto} from "../questions/update.question.dto";
import {NotFoundException} from "@nestjs/common";

export class QuestionService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async getHello(): Promise<string> {return "Hello! Questions only."}

    async CreateQuestion (create_question_dto: CreateQuestionDto): Promise<Question> {
        const question = await this.manager.create(Question, create_question_dto)
        return this.manager.save(question);
    }

    async UpdateQuestion (id: number, update_question_dto: UpdateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const question = await this.manager.findOne(Question, id)
            if (!question) throw new NotFoundException('Question ${id} not found.');
            this.manager.merge(Question, question, update_question_dto);
            return this.manager.save(question);
        })
    }

    async DeleteQuestion (id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const question = await this.manager.findOne(Question, id)
            if (!question) throw new NotFoundException('Question ${id} not found.');
            await manager.delete(Question, id);
        })
    }
}