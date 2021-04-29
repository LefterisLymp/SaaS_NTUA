import { QuestionService } from "./services/create_question_service";
import { CreateQuestionDto } from "./questions/create.question.dto";
export declare class AppController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getHello(): Promise<string>;
    createQuestion(createquestiondto: CreateQuestionDto): Promise<import("./questions/question.entity").Question>;
}
