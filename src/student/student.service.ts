import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/department.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>
  ) {
  }

  async findAll() {
    return await this.studentRepo.find({
      relations: ['department', 'department.admin', 'department.head']
    });
  }

  async findById(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['department', 'department.admin', 'department.head']
    });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: createStudentDto.departmentId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${createStudentDto.departmentId}!`);
    }

    const student = this.studentRepo.create({ ...createStudentDto, department });

    return this.studentRepo.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: updateStudentDto.departmentId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${updateStudentDto.departmentId}!`);
    }

    const student = await this.studentRepo.preload({ id: +id, ...updateStudentDto, department });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return this.studentRepo.update(id, student);
  }

  async remove(id: number) {
    const student = await this.findById(id)

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return this.studentRepo.remove(student);
  }
}
