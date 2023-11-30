import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

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
    book.publishedDate = createBookDto.publishedDate;
    book.publisher = createBookDto.publisher;
    book.registeredDate = createBookDto.registeredDate;

    await this.booksrepository.save(book);

    return { message: 'book Added Successfully' };
  }

  async findAll() {
    const books = await this.booksrepository.find();
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
    book.publishedDate = updateBookDto.publishedDate;
    book.publisher = updateBookDto.publisher;
    book.registeredDate = updateBookDto.registeredDate;

    return this.booksrepository.update(id, book);
  }

  async remove(id: number) {
    return await this.booksrepository.delete(id);
  }
}
