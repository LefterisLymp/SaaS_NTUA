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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("../answers/answer.entity");
let Question = class Question {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID' }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'UsersID' }),
    __metadata("design:type", Number)
], Question.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ name: 'Question_Text' }),
    __metadata("design:type", String)
], Question.prototype, "question_text", void 0);
__decorate([
    typeorm_1.Column({ name: 'Keywords' }),
    __metadata("design:type", String)
], Question.prototype, "keywords", void 0);
__decorate([
    typeorm_1.Column({ name: 'AskedOn' }),
    __metadata("design:type", Date)
], Question.prototype, "asked_on", void 0);
__decorate([
    typeorm_1.OneToMany(type => answer_entity_1.Answer, answer => answer.question_id),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
Question = __decorate([
    typeorm_1.Entity({ name: 'questions' })
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map