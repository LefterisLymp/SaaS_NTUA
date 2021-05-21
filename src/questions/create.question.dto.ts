export class CreateQuestionDto {
    readonly user_id: number;
    readonly question_text: string;
    keywords: string[];
}