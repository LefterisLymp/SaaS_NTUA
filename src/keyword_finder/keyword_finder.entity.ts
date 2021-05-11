import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { Keyword } from '../keyword/keyword.entity';

@Entity({name: 'keyword_finder'})
export class Keyword_Finder {
    @Column({name: 'keyword'})
    keyword: string;

    @Column({name: 'question_id'})
    question_id: number;
}