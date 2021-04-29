import { Question } from '../questions/question.entity';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from "../questions/create.question.dto";
import { UpdateQuestionDto } from "../questions/update.question.dto";
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    getHello(): Promise<string>;
    CreateQuestion(create_question_dto: CreateQuestionDto): Promise<Question>;
    UpdateQuestion(id: number, update_question_dto: UpdateQuestionDto): Promise<Question>;
    DeleteQuestion(id: number): Promise<void>;
}
