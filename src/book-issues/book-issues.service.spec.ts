import { Test, TestingModule } from '@nestjs/testing';
import { BookIssuesService } from './book-issues.service';

describe('BookIssuesService', () => {
  let service: BookIssuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookIssuesService],
    }).compile();

    service = module.get<BookIssuesService>(BookIssuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
