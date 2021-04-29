import {Question} from '../questions/question.entity'
import {Answer} from '../answers/answer.entity'
import {EntityManager} from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

export class Question_Answer_Service {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async CreateQuestion()

}