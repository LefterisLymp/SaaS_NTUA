import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity({name: 'keyword'})
export class Keyword {
    @PrimaryColumn({name: 'keyword'})
    keyword: string;
}