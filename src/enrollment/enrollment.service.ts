import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {
  }

  async enrollCourse(email: string, courseId: number) {
    const student = await this.studentRepo.findOne({
      where: { email }
    });

    if (!await this.courseRepo.findOne({ where: { id: courseId } })) {
      throw new NotFoundException(`Course with id: ${courseId} not found!`);
    }

    const enroll = await this.enrollmentRepo.save({
      status: 'Approval Pending',
      enrollmentDate: new Date(),
      student: student,
      course: { id: courseId }
    });

    return this.enrollmentRepo.findOne({
      where: { id: enroll.id },
      relations: ['student', 'course']
    })
  }

  async dropCourse(email: string, courseId: number) {
    const student = await this.studentRepo.findOne({
      where: { email }
    });

    if (!await this.courseRepo.findOne({ where: { id: courseId } })) {
      throw new NotFoundException(`Course with id: ${courseId} not found!`);
    }

    const enrollment = await this.enrollmentRepo.findOne({
      where: { student, course: { id: courseId } }
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment not found!`);
    }

    await this.enrollmentRepo.remove(enrollment);

    return enrollment;
  }
}
