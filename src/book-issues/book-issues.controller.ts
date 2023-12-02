import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
} from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';

@Controller('book-issues')
export class BookIssuesController {
  constructor(private readonly bookIssuesService: BookIssuesService) {}

  @Get()
  @Render('book-issues/index')
  async getIndexPage() {
    const bookIssues = await this.bookIssuesService.findAll();
    console.log(bookIssues);

    return { bookIssues };
  }

  @Get('create')
  @Render('book-issues/create')
  getCreatePage() {
    return '';
  }

  @Post()
  @Redirect('/book-issues')
  async create(@Body() createBookIssueDto: CreateBookIssueDto) {
    return await this.bookIssuesService.create(createBookIssueDto);
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
  update(
    @Param('id') id: string,
    @Body() updateBookIssueDto: UpdateBookIssueDto,
  ) {
    return this.bookIssuesService.update(+id, updateBookIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookIssuesService.remove(+id);
  }
}
