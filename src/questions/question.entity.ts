import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Answer } from '../answers/answer.entity';
import { Keyword } from '../keyword/keyword.entity'
import {Keyword_Finder} from "../keyword_finder/keyword_finder.entity";

@Entity({name: 'questions'})
export class Question {
  @PrimaryGeneratedColumn({name: 'ID'})
  id: number;

  @Column({name: 'UsersID'})
  user_id: number;

  @Column({name: 'Question_Text'})
  question_text: string;

  @Column({name: 'AskedOn'})
  asked_on: Date;

  @OneToMany(type => Answer, answer => answer.question_id)
  answers: Answer[];

  keywords: string[];
}
