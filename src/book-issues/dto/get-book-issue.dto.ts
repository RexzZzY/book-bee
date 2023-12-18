import { Book } from 'src/books/entities/book.entity';
import { Student } from 'src/students/entities/student.entity';

export class GetBookIssueDto {
  id: number;
  book: Book;
  student: Student;
  issuedOn: Date;
  returnDate: Date;
  returned: boolean;
  status: 'ISSUED' | 'RETURNED' | 'DUE';
}
