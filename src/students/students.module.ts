import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsRestController } from './students.rest.controller';

@Module({
  controllers: [StudentsController, StudentsRestController],
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [TypeOrmModule],
})
export class StudentsModule {}
