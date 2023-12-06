import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { BookIssue } from 'src/book-issues/entities/book-issue.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksrepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = new Book();

    book.title = createBookDto.title;
    book.registerNumber = createBookDto.registerNumber;
    book.author = createBookDto.author;
    book.codeNumber = createBookDto.codeNumber;
    book.ISBN = createBookDto.ISBN;
    book.publishedYear = createBookDto.publishedYear;
    book.publisher = createBookDto.publisher;
    book.registeredDate = createBookDto.registeredDate;

    await this.booksrepository.save(book);

    return { message: 'book Added Successfully' };
  }

  async findAll(offset: number, limit: number) {
    const books = await this.booksrepository.findAndCount({
      order: {
        registerNumber: { direction: 'ASC' },
      },
      skip: offset,
      take: limit,
    });

    return books;
  }

  async findByKeyword(keyword: string) {
    const books = await this.booksrepository.find({
      relations: {
        bookIssue: true,
      },
      where: [
        { bookIssue: { id: IsNull() }, title: ILike(`${keyword}%`) },
        {
          bookIssue: { id: IsNull() },
          registerNumber: ILike(Number.parseInt(keyword) | 0),
        },
      ],
    });

    return books;
  }

  findOne(id: number) {
    return this.booksrepository.findOneBy({ id: id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = new Book();

    book.title = updateBookDto.title;
    book.registerNumber = updateBookDto.registerNumber;
    book.author = updateBookDto.author;
    book.codeNumber = updateBookDto.codeNumber;
    book.ISBN = updateBookDto.ISBN;
    book.publishedYear = updateBookDto.publishedYear;
    book.publisher = updateBookDto.publisher;
    book.registeredDate = updateBookDto.registeredDate;

    return this.booksrepository.update(id, book);
  }

  async remove(id: number) {
    return await this.booksrepository.delete(id);
  }
}
