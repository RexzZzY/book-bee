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
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { FetchStudentDto } from './dto/fetch-student.dto';

@Controller('rest/v1/students')
export class StudentsRestController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('select2')
  async getAll(@Query('term') keyword: string) {
    const students = await this.studentsService.findByKeyword(keyword);

    const studentsResponse: FetchStudentDto[] = [];

    students.forEach((student) => {
      studentsResponse.push({
        id: student.id,
        text: student.name,
      });
    });

    return { results: studentsResponse, pagination: { more: false } };
  }
}
