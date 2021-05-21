import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { Keyword } from '../keyword/keyword.entity';

@Entity({name: 'keyword_finder'})
export class Keyword_Finder {
    @PrimaryColumn({name: 'keyword'})
    keyword: string;

    @PrimaryColumn({name: 'question_id'})
    question_id: number;
}