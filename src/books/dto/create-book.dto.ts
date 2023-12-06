import { Book } from '../entities/book.entity';

export class CreateBookDto {
  registerNumber: number;
  title: string;
  author: string;
  codeNumber: string;
  registeredDate: Date;
  ISBN: string;
  publisher: string;
  publishedYear: string;

  public toEntity() {
    const book = new Book();

    book.title = this.title;
    book.registerNumber = this.registerNumber;
    book.author = this.author;
    book.codeNumber = this.codeNumber;
    book.ISBN = this.ISBN;
    book.publishedYear = this.publishedYear;
    book.publisher = this.publisher;
    book.registeredDate = this.registeredDate;

    return book;
  }
}
