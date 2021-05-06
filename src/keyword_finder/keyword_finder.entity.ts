import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';
import { Keyword } from '../keyword/keyword.entity';

@Entity({name: 'keyword_finder'})
export class Keyword_Finder {
    @PrimaryGeneratedColumn({name: 'keyword'})
    keyword: string;

    @Column({name: 'question_id'})
    question_id: number;

    @OneToMany(type => Keyword, Keyword => Keyword.keyword)
    keywords: Keyword[];

    @OneToMany(type => Question, Question => Question.question_id)
    questions: Question[];
}