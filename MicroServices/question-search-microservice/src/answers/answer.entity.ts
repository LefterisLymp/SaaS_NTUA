import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Question} from "../questions/question.entity";
import {Injectable} from "@nestjs/common";

@Entity({name: 'answers'})
export class Answer {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: 'QuestionsID'})
    question_id: number;

    @Column({name: 'UsersID'})
    user_id: number;

    @Column({name: 'Answer_text'})
    answer_text: string;

    @Column({name: 'Mark', default: 0})
    mark: number;

    @Column({name: 'AnsweredOn'})
    answered_on: Date;

    @ManyToOne(() => Question, Question => Question.answers, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name: 'question_id'})
    question: Question;
    answer: Promise<Question>;
}
