"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const question_entity_1 = require("../questions/question.entity");
const answer_entity_1 = require("../answers/answer.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async CreateAnswer(id, create_answer_dto) {
        return this.manager.transaction(async (manager) => {
            const question_id = create_answer_dto.question.id;
            if (!question_id)
                throw new common_1.BadRequestException('Question id missing.');
            const question = await this.manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException("Question ${id} not found.");
            const answer = await this.manager.create(answer_entity_1.Answer, create_answer_dto);
            answer.question = question;
            return this.manager.save(answer);
        });
    }
    async UpdateAnswer(id, update_answer_dto) {
        return this.manager.transaction(async (manager) => {
            const answer = await this.manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException('Answer ${id} not found.');
            this.manager.merge(answer_entity_1.Answer, answer, update_answer_dto);
            return this.manager.save(answer);
        });
    }
    async DeleteAnswer(id) {
        return this.manager.transaction(async (manager) => {
            const answer = await this.manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException('Answer ${id} not found.');
            await manager.delete(answer_entity_1.Answer, id);
        });
    }
};
AnswerService = __decorate([
    __param(0, typeorm_2.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=create_answer_service.js.map