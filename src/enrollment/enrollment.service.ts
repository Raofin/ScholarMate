import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../student/student.entity';
import { Registrar } from '../registrar/registrar.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Registrar)
    private readonly registrarRepo: Repository<Registrar>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) { }

}
