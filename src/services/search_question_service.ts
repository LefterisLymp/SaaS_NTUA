import {Question} from '../questions/question.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import {Keyword_Finder} from "../keyword_finder/keyword_finder.entity";
import {Keyword} from "../keyword/keyword.entity";

export class Search_question_service{

    constructor(@InjectEntityManager() private manager: EntityManager) {}

    // @ts-ignore
    async filter_by_keyword(questions: Question[], keyword:string): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            let answer: Question[]
            const quest = await this.manager.find(Keyword_Finder, {keyword: keyword})
            let ids: Set<number>
            for (let i = 0; i < quest.length; i++) {
                ids.add(quest[i]["question_id"]);
            }

            for (let i = 0; i < questions.length; i++) {
                if (ids.has(questions[i]["id"])) {
                    answer.push(questions[i]);
                }
            }
            return answer})
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

    async search_by_keyword(keyword: string): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            const questions = await this.manager.find(Keyword_Finder, {keyword: keyword})
            let answer: Question[]
            for (let i = 0; i < questions.length; i++) {
                const qu = await this.manager.findOne(Question, {id: questions[i]["question_id"]});
                answer.push(qu);
            }
            return answer;
        })
    }


    async questions_per_keyword(keywords: Keyword[]): Promise<Keyword[]> {
        return this.manager.transaction(async manager => {
            const answer = [];
            for (let i = 0; i < keywords.length; i++) {
                const count = await this.manager.find(Keyword_Finder, {keyword: keywords[i]["keyword"]})
                answer.push([keywords[i]["keyword"],count.length]);
            }
            return answer})
    }    

}
