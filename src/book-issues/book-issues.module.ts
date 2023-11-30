import { Module } from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { BookIssuesController } from './book-issues.controller';
import { BookIssue } from './entities/book-issue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BookIssuesController],
  providers: [BookIssuesService],
  imports: [TypeOrmModule.forFeature([BookIssue])],
})
export class BookIssuesModule {}
