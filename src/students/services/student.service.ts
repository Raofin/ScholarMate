import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Department } from '../constants/students.constants';
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

  async findByDept(dept: Department) {
    const students = await this.studentRepo.findBy({ dept: dept });

    if (!students) {
      throw new NotFoundException(`There are not students in the department of ${dept}.`);
    }

    return students;
  }

  create(createStudentDto: CreateStudentDto) {
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

    return this.studentRepo.save(student);
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
