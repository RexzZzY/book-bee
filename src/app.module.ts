import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './db.source';
import { StudentsModule } from './students/students.module';
import { BookIssuesModule } from './book-issues/book-issues.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot(AppDataSourceOptions),
    StudentsModule,
    BookIssuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
