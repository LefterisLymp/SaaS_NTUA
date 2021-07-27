import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn({name: 'ID'})
  id: number;

  @Column({name: 'Username'})
  username: string;

  @Column({name: 'Hashed_password'})
  hashed_password: string;

  @Column({name: 'First_name'})
  first_name: string;

  @Column({name: 'Last_name'})
  last_name: string;

  @Column({name: 'Token', default: null})
  token: string;

  @Column({name: 'Role'})
  role: string;
}
