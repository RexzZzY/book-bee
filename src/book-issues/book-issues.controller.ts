import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
  Query,
} from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { CreateBookIssueDto } from './dto/create-book-issue.dto';
import { UpdateBookIssueDto } from './dto/update-book-issue.dto';

@Controller('book-issues')
export class BookIssuesController {
  constructor(private readonly bookIssuesService: BookIssuesService) {}

  @Get()
  @Render('book-issues/index')
  async getIndexPage(@Query('page') page = 1) {
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const [bookIssues, count] = await this.bookIssuesService.findAll(
      offset,
      itemsPerPage,
    );
    return {
      items: bookIssues,
      pagination: {
        totalPages: Math.ceil(count / itemsPerPage),
        currentPage: +page,
      },
    };
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

  @Get(':id/return')
  @Redirect('/book-issues')
  returnBook(@Param('id') id: string) {
    return this.bookIssuesService.update(+id, { returned: true });
  }

  @Get(':id/delete')
  @Redirect('/book-issues')
  deleteBookissue(@Param('id') id: string) {
    return this.bookIssuesService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookIssueDto: UpdateBookIssueDto,
  ) {
    return this.bookIssuesService.update(+id, updateBookIssueDto);
  }
}
