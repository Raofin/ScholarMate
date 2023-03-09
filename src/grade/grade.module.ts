import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';
import { Faculty } from '../faculty/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Course, Student, Faculty])],
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule {}
