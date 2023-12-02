import { BookIssue } from 'src/book-issues/entities/book-issue.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => BookIssue, (bookIssue) => bookIssue.student)
  bookIssue: BookIssue[];
}
