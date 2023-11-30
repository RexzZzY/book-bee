import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';

@Controller('book-issues')
export class BookIssuesController {
  constructor(private readonly bookIssuesService: BookIssuesService) {}

  @Post()
  create(@Body() createBookIssueDto: CreateBookIssueDto) {
    return this.bookIssuesService.create(createBookIssueDto);
  }

  @Get()
  findAll() {
    return this.bookIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookIssuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookIssueDto: UpdateBookIssueDto) {
    return this.bookIssuesService.update(+id, updateBookIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookIssuesService.remove(+id);
  }
}
