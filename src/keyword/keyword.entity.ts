import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany} from 'typeorm';
import {Question} from "../questions/question.entity";

@Entity({name: 'keyword'})
export class Keyword {
    @PrimaryColumn({name: 'keyword'})
    keyword: string;
}