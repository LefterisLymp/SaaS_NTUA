import { Question } from '../questions/question.entity';
export declare class User {
    id: number;
    username: string;
    hashed_password: string;
    first_name: string;
    last_name: string;
    token: string;
    role: string;
    questions: Question[];
}
