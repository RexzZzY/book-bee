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
  ClassSerializerInterceptor,
  UseInterceptors,
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
  async findAll() {
    const allBooks = await this.booksService.findAll();
    return { books: allBooks };
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
    console.log(book.publishedDate);

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
