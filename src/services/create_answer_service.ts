import {Question} from '../questions/question.entity'
import {Answer} from '../answers/answer.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import {CreateAnswerDto} from "../answers/create.answer.dto";
import {UpdateAnswerDto} from "../answers/update.answer.dto";
import {BadRequestException, NotFoundException} from "@nestjs/common";

export class AnswerService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async CreateAnswer (id: number, create_answer_dto: CreateAnswerDto): Promise<Answer> {
        return this.manager.transaction( async manager => {
            const question_id = create_answer_dto.question.id;
            if (!question_id) throw new BadRequestException('Question id missing.');
            const question = await this.manager.findOne(Question, id)
            if (!question) throw new NotFoundException("Question ${id} not found.")
            const answer = await this.manager.create(Answer, create_answer_dto)
            answer.question = question;
            return this.manager.save(answer);
        })
    }

    async UpdateAnswer (id: number, update_answer_dto: UpdateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const answer = await this.manager.findOne(Answer, id)
            if (!answer) throw new NotFoundException('Answer ${id} not found.');
            this.manager.merge(Answer, answer, update_answer_dto);
            return this.manager.save(answer);
        })
    }

    async DeleteAnswer (id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const answer = await this.manager.findOne(Answer, id)
            if (!answer) throw new NotFoundException('Answer ${id} not found.');
            await manager.delete(Answer, id);
        })
    }
}