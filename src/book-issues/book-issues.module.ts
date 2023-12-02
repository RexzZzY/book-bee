import { Module } from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { BookIssuesController } from './book-issues.controller';
import { BookIssue } from './entities/book-issue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [BookIssuesController],
  providers: [BookIssuesService],
  imports: [StudentsModule, BooksModule, TypeOrmModule.forFeature([BookIssue])],
})
export class BookIssuesModule {}
