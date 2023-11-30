import { Injectable } from '@nestjs/common';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';

@Injectable()
export class BookIssuesService {
  create(createBookIssueDto: CreateBookIssueDto) {
    return 'This action adds a new bookIssue';
  }

  findAll() {
    return `This action returns all bookIssues`;
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
