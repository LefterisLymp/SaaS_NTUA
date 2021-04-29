import { Answer } from '../answers/answer.entity';
import { EntityManager } from 'typeorm';
import { CreateAnswerDto } from "../answers/create.answer.dto";
import { UpdateAnswerDto } from "../answers/update.answer.dto";
export declare class AnswerService {
    private manager;
    constructor(manager: EntityManager);
    CreateAnswer(id: number, create_answer_dto: CreateAnswerDto): Promise<Answer>;
    UpdateAnswer(id: number, update_answer_dto: UpdateAnswerDto): Promise<Answer>;
    DeleteAnswer(id: number): Promise<void>;
}
