import { Transform } from 'class-transformer';
import { BookIssue } from 'src/book-issues/entities/book-issue.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registerNumber: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  codeNumber: string;

  @Column()
  @Transform(({ value }) => (value as Date).toISOString().split('T')[0], {
    toPlainOnly: true,
  })
  registeredDate: Date;

  @Column()
  ISBN: string;

  @Column()
  publisher: string;

  @Column()
  publishedYear: string;

  @OneToOne(() => BookIssue, (bookIssue) => bookIssue.book)
  bookIssue: BookIssue;
}
