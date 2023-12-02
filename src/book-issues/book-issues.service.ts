import { Injectable } from '@nestjs/common';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { ILike, Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { BookIssue } from './entities/book-issue.entity';

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

  async findAll() {
    return await this.bookIssueRepository.find();
  }

  async findByKeyword(keyword: string) {
    const IssuesbookIds = await this.bookIssueRepository.find({
      select: {
        book: {
          id: true,
        },
      },
      relations: {
        book: true,
      },
    });

    console.log(IssuesbookIds);

    const books = await this.bookRepository.find({
      where: [
        { registerNumber: ILike(Number.parseInt(keyword) | 0) },
        { title: ILike(`${keyword}%`) },
      ],
      // relations: {
      //   bookIssue: true,
      // },
    });

    return books;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookIssue`;
  }

  update(id: number, updateBookIssueDto: UpdateBookIssueDto) {
    return `This action updates a #${id} bookIssue`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookIssue`;
  }
}
