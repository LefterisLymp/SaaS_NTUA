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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("../questions/question.entity");
let Answer = class Answer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID' }),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'QuestionsID' }),
    __metadata("design:type", Number)
], Answer.prototype, "question_id", void 0);
__decorate([
    typeorm_1.Column({ name: 'UsersID' }),
    __metadata("design:type", Number)
], Answer.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ name: 'Answer_text' }),
    __metadata("design:type", String)
], Answer.prototype, "answer_text", void 0);
__decorate([
    typeorm_1.Column({ name: 'Mark', default: 0 }),
    __metadata("design:type", Number)
], Answer.prototype, "mark", void 0);
__decorate([
    typeorm_1.Column({ name: 'Keywords' }),
    __metadata("design:type", String)
], Answer.prototype, "keywords", void 0);
__decorate([
    typeorm_1.Column({ name: 'AnsweredOn' }),
    __metadata("design:type", Date)
], Answer.prototype, "answered_on", void 0);
__decorate([
    typeorm_1.ManyToOne(() => question_entity_1.Question, Question => Question.answers, { nullable: false, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], Answer.prototype, "question", void 0);
Answer = __decorate([
    typeorm_1.Entity({ name: 'answers' })
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=answer.entity.js.map