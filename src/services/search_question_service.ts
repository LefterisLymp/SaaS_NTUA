import {Question} from '../questions/question.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import {Keyword_Finder} from "../keyword_finder/keyword_finder.entity";
import {Keyword} from "../keyword/keyword.entity";
import {Answer} from "../answers/answer.entity";

export class Search_question_service{

    constructor(@InjectEntityManager() private manager: EntityManager) {}

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

    async search_by_keyword(keyword_s: string): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            const questions = await this.manager.find(Keyword_Finder, {keyword: keyword_s})
            let answer = []
            for (let i = 0; i < questions.length; i++) {
                const qu = await this.manager.findOne(Question, {id: questions[i]["question_id"]});
                answer.push(qu);
            }
            return answer;
        })
    }

    async search_by_date(from_date: string, to_date: string): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            const fr = new Date(from_date.replace("/", "-"));
            const to = new Date(to_date.replace("/", "-"));
            const questions = await this.manager.find(Question)
            let answer = []
            for (let i = 0; i < questions.length; i++) {
                if (questions[i]["asked_on"] >= fr && questions[i]["asked_on"] <= to) {
                    answer.push(questions[i])
                }
            }
            return answer;
        })

    }


    async questions_per_keyword(keywords: Keyword[]) {
        return this.manager.transaction(async manager => {
            const answer = [];
            for (let i = 0; i < keywords.length; i++) {
                const count = await this.manager.find(Keyword_Finder, {keyword: keywords[i]["keyword"]})
                answer.push([keywords[i]["keyword"],count.length]);
            }
            return answer})
    }

    async QAperUserid(id: number) {
        const questions = await this.manager.find(Question, {user_id: id});
        const answers = await this.manager.find(Answer, {user_id: id});
        for (var i = 0; i < answers.length; i++) {
            const q_id = answers[i]["question_id"];
            const question = await this.manager.findOne(Question, {id: q_id})
            answers[i]["question_title"] = question["title"];
        }
        let data = {};
        data["questions"] = questions;
        data["answers"] = answers;
        return data;
    }

    async QAperDay() {
        const questions = await this.manager.find(Question);
        const answers = await this.manager.find(Answer);
        let q_map = new Map<string, number>();
        let a_map = new Map<string, number>();

        let question_dates = new Array<string>()
        let question_nums = new Array<number>()
        let answer_dates = new Array<string>()
        let answer_nums = new Array<number>()
        for(var i = 0; i < questions.length; i++) {
            let date = questions[i].asked_on;
            let date_s = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth() + 1).toString() + "-" + date.getUTCDate().toString()
            if (q_map.has(date_s)) {
                q_map.set(date_s, q_map.get(date_s) + 1)
            } else {
                q_map.set(date_s, 1);
            }
        }


        for (var i = 0; i < answers.length; i++) {
            let date = answers[i].answered_on;
            let date_s = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth()+1).toString() + "-" +  date.getUTCDate().toString()
            if (a_map.has(date_s)) {
                a_map.set(date_s, a_map.get(date_s) + 1)
            } else {
                a_map.set(date_s, 1);
            }
        }


        question_dates = Array.from(q_map.keys())
        question_nums = Array.from(q_map.values())

        answer_dates = Array.from(a_map.keys())
        answer_nums =  Array.from(a_map.values())

        return {
            questions: {
                labels: question_dates,
                datasets: [{
                    label: '# of questions',
                    data: question_nums,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            answers: {
                labels: answer_dates,
                datasets: [{
                    label: '# of answers',
                    data: answer_nums,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            }
        }
    }

    async questions_keyword() {
        const keyw_find = await this.manager.find(Keyword_Finder);
        let k_map = new Map<string, number>();
        for(var i = 0; i < keyw_find.length; i++) {
            let keyword = keyw_find[i].keyword;
            if (k_map.has(keyword)) {
                k_map.set(keyword, k_map.get(keyword) + 1)
            } else {
                k_map.set(keyword, 1);
            }
        }
        let questions = Array.from(k_map.values())
        let keywords = Array.from(k_map.keys())
        return {
            labels: keywords,
            datasets: [{
                label: '# of questions per keyword',
                data: questions,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    }

    async postings_per_day(id: number) {
        const questions = await this.manager.find(Question, {user_id: id});
        const answers = await this.manager.find(Answer, {user_id: id});
        let p_map = new Map<string, number>();

        for(var i = 0; i < questions.length; i++) {
            let date = questions[i].asked_on;
            let date_s = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth() + 1).toString() + "-" + date.getUTCDate().toString()
            if (p_map.has(date_s)) {
                p_map.set(date_s, p_map.get(date_s) + 1)
            } else {
                p_map.set(date_s, 1);
            }
        }


        for (var i = 0; i < answers.length; i++) {
            let date = answers[i].answered_on;
            let date_s = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth()+1).toString() + "-" +  date.getUTCDate().toString()
            if (p_map.has(date_s)) {
                p_map.set(date_s, p_map.get(date_s) + 1)
            } else {
                p_map.set(date_s, 1);
            }
        }


        let posting_dates = Array.from(p_map.keys())
        let posting_nums = Array.from(p_map.values())


        return {
            labels: posting_dates,
            datasets: [{
                label: '# of postings per day',
                data: posting_nums,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    }


}
