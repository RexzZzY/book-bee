import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  indexNumber: string;

  @Column()
  name: string;

  @Column()
  grade: string;

  @Column()
  gender: string;
}
