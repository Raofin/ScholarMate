import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { StudentDto, UpdateStudentDto } from './student.dto';
import { Dept } from '../departments/department.constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {
  }

  findAll() {
    return this.studentRepo.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOneBy({ id });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return student;
  }

  async findByDept(dept: Dept) {
    const students = await this.studentRepo.findBy({ dept: dept });

    if (!students) {
      throw new NotFoundException(`There are no students in the department of ${dept}.`);
    }

    return students;
  }

  create(createStudentDto: StudentDto) {
    const student = this.studentRepo.create(createStudentDto);
    return this.studentRepo.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepo.preload({
      id: +id,
      ...updateStudentDto
    });

    if (!student) {
      throw new NotFoundException(`Student #${id} not found.`);
    }

    return this.studentRepo.update(id, student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentRepo.remove(student);
  }

  async findCoursesById(id: number) {
    const existingStudent = await this.findOne(id);

    if (!existingStudent) {
      throw new Error(`Student with id: ${id} not found.`);
    }

    return existingStudent.courses;
  }
}