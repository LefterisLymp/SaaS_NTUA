import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({name: 'Mark'})
    mark: number;

    @Column({name: 'Keywords'})
    keywords: string;

    @Column({name: 'AnsweredOn'})
    answered_on: Date;
}
