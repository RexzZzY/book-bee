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
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { text } from 'stream/consumers';
import { FetchBookDto } from './dto/fetch-book.dto';

@Controller('rest/v1/books')
export class BooksRestController {
  constructor(private readonly booksService: BooksService) {}

  @Get('select2')
  async getAll(@Query('term') keyword: string) {
    const books = await this.booksService.findByKeyword(keyword);

    const bookResponse: FetchBookDto[] = [];

    books.forEach((book) => {
      bookResponse.push({
        id: book.id,
        text: book.title + `(${book.registerNumber})`,
      });
    });

    return { results: bookResponse, pagination: { more: false } };
  }
}
