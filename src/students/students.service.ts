import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = new Student();

    student.name = createStudentDto.name;
    student.indexNumber = createStudentDto.indexNumber;
    student.gender = createStudentDto.gender;
    student.grade = createStudentDto.grade;

    return await this.repository.save(student);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findByKeyword(keyword: string) {
    const students = await this.repository.find({
      where: [
        { indexNumber: ILike(`${keyword}%`) },
        { name: ILike(`%${keyword}%`) },
      ],
    });

    return students;
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = new Student();
    student.name = updateStudentDto.name;
    student.indexNumber = updateStudentDto.indexNumber;
    student.gender = updateStudentDto.gender;
    student.grade = updateStudentDto.grade;
    return await this.repository.update(id, student);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
