import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'keyword'})
export class Keyword {
    @PrimaryGeneratedColumn({name: 'keyword'})
    keyword: string;

}