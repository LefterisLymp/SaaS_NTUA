export class CreateAnswerDto {
    readonly  user_id: number;
    readonly  answer_text: string;
    readonly  answered_on: Date;
    readonly  question: {id: number};
}