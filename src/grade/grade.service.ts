import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';
import { Faculty } from '../faculty/faculty.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Faculty)
    private readonly facultyRepo: Repository<Faculty>
  ) { }

}
