import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // index
  @Get()
  @Render('books/index')
  findAll() {
    return { message: this.booksService.findAll() };
  }

  // create
  @Get('create')
  @Render('books/create')
  createOne() {
    return '';
  }

  // store
  @Post()
  @Render('books/index') // render index with success message
  create(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return this.booksService.create(createBookDto);
  }

  // show
  @Get(':id')
  @Render('books/show')
  findOne(@Param('id') id: string) {
    // return this.booksService.findOne(+id);
    return { id: id };
  }

  // edit
  @Get(':id/edit')
  @Render('books/edit')
  editOne(@Param('id') id: string) {
    // return this.booksService.findOne(+id);
    return { id: id };
  }

  // update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  // destroy
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
