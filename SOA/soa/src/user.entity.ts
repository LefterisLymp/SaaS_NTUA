import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hashed_Password: string;

  @Column()
  first_Name: string;

  @Column()
  last_Name: string;

  @Column()
  token: string;

  @Column()
  role: string;
}
