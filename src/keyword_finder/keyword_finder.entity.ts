import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../questions/question.entity';
import { Keyword } from '../keyword/keyword.entity';

@Entity({name: 'keyword_finder'})
export class Keyword_Finder {
    @PrimaryColumn({name: 'keyword'})
    keyword: string;

    // @ts-ignore
    @ManyToOne(() => Question, Question => Question.keywords, {onDelete: "CASCADE"})
    @PrimaryColumn()
    @JoinColumn({name: 'question_id'})
    question_id: number;
}