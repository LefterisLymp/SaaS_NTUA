export class CreateQuestionDto {
    readonly  user_id: number;
    readonly  question_text: string;
    readonly  keywords: string;
    readonly  asked_on: Date;
}