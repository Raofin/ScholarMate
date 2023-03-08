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
    @InjectRepository(Student)
    private readonly departmentRepo: Repository<Department>
  ) {
  }

  findAll() {
    return this.studentRepo.find({
      relations: ['department']
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['department']
    });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return student;
  }

  /*async findByDept(dept: Dept) {
    const students = await this.studentRepo.findBy({ dept: dept });

    if (!students) {
      throw new NotFoundException(`There are no students in the department of ${dept}.`);
    }

    return students;
  }*/

  async create(createStudentDto: CreateStudentDto) {
    const department = await this.departmentRepo.findOneOrFail({
      where: { id: createStudentDto.departmentId }
    });

    const student = this.studentRepo.create({ ...createStudentDto, department });

    return this.studentRepo.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const department = await this.departmentRepo.findOneOrFail({
      where: { id: updateStudentDto.departmentId }
    });

    const student = this.studentRepo.create({ id: +id, ...updateStudentDto, department });

    if (!student) {
      throw new NotFoundException(`Student #${id} not found.`);
    }

    return this.studentRepo.update(id, student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentRepo.remove(student);
  }

  /*async findCoursesById(id: number) {
    const existingStudent = await this.findOne(id);

    if (!existingStudent) {
      throw new Error(`Student with id: ${id} not found.`);
    }

    return existingStudent.courses;
  }*/

  /*private async preloadDepartmentById(id: number): Promise<Department> {
    const existingDepartment = await this.departmentRepo.findOneBy({ id });

    if (!existingDepartment) {
      throw new NotFoundException(`Department with id: ${id} not found.`);
    }

    return existingDepartment;
  }*/
}
