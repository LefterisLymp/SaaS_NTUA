import { Answer } from '../answers/answer.entity';
export declare class Question {
    id: number;
    user_id: number;
    question_text: string;
    keywords: string;
    asked_on: Date;
    answers: Answer[];
}
