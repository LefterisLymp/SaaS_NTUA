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
exports.QuestionService = void 0;
const question_entity_1 = require("../questions/question.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async getHello() { return "Hello! Questions only."; }
    async CreateQuestion(create_question_dto) {
        const question = await this.manager.create(question_entity_1.Question, create_question_dto);
        return this.manager.save(question);
    }
    async UpdateQuestion(id, update_question_dto) {
        return this.manager.transaction(async (manager) => {
            const question = await this.manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException('Question ${id} not found.');
            this.manager.merge(question_entity_1.Question, question, update_question_dto);
            return this.manager.save(question);
        });
    }
    async DeleteQuestion(id) {
        return this.manager.transaction(async (manager) => {
            const question = await this.manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException('Question ${id} not found.');
            await manager.delete(question_entity_1.Question, id);
        });
    }
};
QuestionService = __decorate([
    __param(0, typeorm_2.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=create_question_service.js.map