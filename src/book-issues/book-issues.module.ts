import { Module } from '@nestjs/common';
import { BookIssuesService } from './book-issues.service';
import { BookIssuesController } from './book-issues.controller';

@Module({
  controllers: [BookIssuesController],
  providers: [BookIssuesService],
})
export class BookIssuesModule {}
