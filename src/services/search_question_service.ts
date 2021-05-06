import {Question} from '../questions/question.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

export class Search_question_service{

    constructor(@InjectEntityManager() private manager: EntityManager) {}

    // @ts-ignore
    async filter_by_keyword(questions: Question[], keyword:string): Promise<Question[]> {
        let answer: Question[]
        for (let i = 0; i < questions.length; i++) {
            if (questions[i]["keywords"].includes(keyword)) {
                answer.push(questions[i])
            }
        }
        return answer
    }

    async filter_by_date(questions: Question[], from_date: Date, to_date: Date) {
        let answer: Question[]
        for (let i = 0; i < questions.length; i++) {
            if (questions[i]["asked_on"] >= from_date && questions[i]["asked_on"] <= to_date) {
                answer.push(questions[i])
            }
        }
        return answer
    }


}