import { Test, TestingModule } from '@nestjs/testing';
import { BookIssuesController } from './book-issues.controller';
import { BookIssuesService } from './book-issues.service';

describe('BookIssuesController', () => {
  let controller: BookIssuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookIssuesController],
      providers: [BookIssuesService],
    }).compile();

    controller = module.get<BookIssuesController>(BookIssuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
