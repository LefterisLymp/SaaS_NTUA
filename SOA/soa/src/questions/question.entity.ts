import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'questions'})
export class Question {
  @PrimaryGeneratedColumn({name: 'ID'})
  id: number;

  @Column({name: 'UsersID'})
  user_id: number;

  @Column({name: 'Question_Text'})
  question_text: string;

  @Column({name: 'Keywords'})
  keywords: string;

  @Column({name: 'AskedOn'})
  asked_on: Date;
}
