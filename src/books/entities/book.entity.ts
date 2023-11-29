import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Transform(({ value }) => (value as Date).toISOString().split('T')[0], {
    toPlainOnly: true,
  })
  publishedDate: Date;
}
