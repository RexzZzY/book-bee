import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './db.source';

@Module({
  imports: [BooksModule, TypeOrmModule.forRoot(AppDataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
