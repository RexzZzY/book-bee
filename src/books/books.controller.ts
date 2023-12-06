import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Redirect,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // index
  @Get('')
  @Render('books/index')
  async findAll(@Query('page') page = 1) {
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const [allBooks, count] = await this.booksService.findAll(
      offset,
      itemsPerPage,
    );

    return {
      items: allBooks,
      pagination: {
        totalPages: Math.ceil(count / itemsPerPage),
        currentPage: +page,
      },
    };
  }

  // create
  @Get('create')
  @Render('books/create')
  createOne() {
    return '';
  }

  // store
  @Post()
  @Redirect('/books')
  async create(@Body() createBookDto: CreateBookDto) {
    // create new book
    await this.booksService.create(createBookDto);
  }

  // show
  @Get(':id')
  @Render('books/show')
  findOne(@Param('id') id: string) {
    // return this.booksService.findOne(+id);
    return { id: id };
  }

  // edit
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/edit')
  @Render('books/edit')
  async editOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(+id);
    console.log(book.publishedYear);

    return { book };
  }

  // delete
  @Get(':id/delete')
  @Redirect('/books')
  async removeOne(@Param('id') id: string) {
    await this.booksService.remove(+id);
  }

  // update
  @Post(':id/update')
  @Redirect('/books')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }
}
