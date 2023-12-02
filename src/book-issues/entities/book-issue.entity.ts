import { Book } from 'src/books/entities/book.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Book, { eager: true })
  @JoinColumn()
  book: Book;

  @ManyToOne(() => Student, (student) => student.bookIssue, { eager: true })
  @JoinColumn()
  student: Student;

  @CreateDateColumn()
  issuedOn: Date;

  @Column()
  returnDate: Date;
}
