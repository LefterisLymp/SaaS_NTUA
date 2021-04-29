import { Question } from "../questions/question.entity";
export declare class Answer {
    id: number;
    question_id: number;
    user_id: number;
    answer_text: string;
    mark: number;
    keywords: string;
    answered_on: Date;
    question: Question;
    answer: Promise<Question>;
}
