import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from '../answers/answer.entity';
import { Keyword } from '../keyword/keyword.entity'

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

  @OneToMany(type => Keyword, keyword => keyword)
  keywords: string[];
}
