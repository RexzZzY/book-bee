import { Injectable } from '@nestjs/common';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { BookIssue } from './entities/book-issue.entity';
import { GetBookIssueDto } from './dto/get-book-issue.dto';

@Injectable()
export class BookIssuesService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(BookIssue)
    private bookIssueRepository: Repository<BookIssue>,
  ) {}

  async create(createBookIssueDto: CreateBookIssueDto) {
    const bookIssue = new BookIssue();

    const book = await this.bookRepository.findOneBy({
      id: Number.parseInt(createBookIssueDto.bookId),
    });

    const student = await this.studentRepository.findOneBy({
      id: Number.parseInt(createBookIssueDto.studentId),
    });

    bookIssue.book = book;
    bookIssue.student = student;
    bookIssue.returnDate = createBookIssueDto.returnDate;

    return await this.bookIssueRepository.save(bookIssue);
  }

  async findAll(
    offset: number,
    limit: number,
  ): Promise<[GetBookIssueDto[], number]> {
    const [bookIssues, count] = await this.bookIssueRepository.findAndCount({
      order: {
        issuedOn: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    const bookIssueDtos: GetBookIssueDto[] = [];

    bookIssues.forEach((bookIssue) => {
      const bookIssueDto = new GetBookIssueDto();
      bookIssueDto.id = bookIssue.id;
      bookIssueDto.book = bookIssue.book;
      bookIssueDto.issuedOn = bookIssue.issuedOn;
      bookIssueDto.returnDate = bookIssue.returnDate;
      bookIssueDto.returned = bookIssue.returned;
      bookIssueDto.student = bookIssue.student;

      if (bookIssue.returned) {
        bookIssueDto.status = 'RETURNED';
      } else {
        if (new Date() > bookIssue.returnDate) {
          bookIssueDto.status = 'DUE';
        } else {
          bookIssueDto.status = 'ISSUED';
        }
      }

      bookIssueDtos.push(bookIssueDto);
    });

    return [bookIssueDtos, count];
  }

  findOne(id: number) {
    return `This action returns a #${id} bookIssue`;
  }

  update(id: number, updateBookIssueDto: UpdateBookIssueDto) {
    return this.bookIssueRepository.update(id, updateBookIssueDto);
  }

  remove(id: number) {
    return this.bookIssueRepository.delete({ id: id });
  }
}
