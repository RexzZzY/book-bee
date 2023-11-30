import { PartialType } from '@nestjs/mapped-types';
import { CreateBookIssueDto } from './create-book-issue.dto';

export class UpdateBookIssueDto extends PartialType(CreateBookIssueDto) {}
