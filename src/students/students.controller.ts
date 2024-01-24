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
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Render('students/index')
  async getIndexpage(@Query('page') page = 1) {
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const [allStudents, count] = await this.studentsService.findAll(
      offset,
      itemsPerPage,
    );

    return {
      items: allStudents,
      pagination: {
        totalPages: Math.ceil(count / itemsPerPage),
        currentPage: +page,
      },
    };
  }

  @Get('create')
  @Render('students/create')
  getCreatePage() {
    return '';
  }

  @Get(':id/edit')
  @Render('students/edit')
  async getEditPage(@Param('id') id: string) {
    const student = await this.studentsService.findOne(+id);
    return { student };
  }

  @Post()
  @Redirect('/students')
  async createOne(@Body() createStudentDto: CreateStudentDto) {
    const newStudent = await this.studentsService.create(createStudentDto);
    return { message: 'student created successfully', newStudent };
  }

  // delete
  @Get(':id/delete')
  async removeOne(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.studentsService.remove(+id);
      return res.redirect('/students');
    } catch (error) {
      res.render('error/500');
    }
  }

  // update
  @Post(':id/update')
  @Redirect('/students')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Get('*')
  @Render('error/404')
  notfound() {
    return 0;
  }
}
