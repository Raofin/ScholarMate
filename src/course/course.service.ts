import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Department } from '../department/department.entity';
import { Registrar } from '../registrar/registrar.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Registrar)
    private readonly registrarRepo: Repository<Registrar>
  ) { }

  async findAll() {
    return await this.courseRepo.find({
      relations: ['department', 'department.admin', 'department.head', 'registrar']
    });
  }

  async findById(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['department', 'department.admin', 'department.head', 'registrar']
    });

    if (!course) {
      throw new NotFoundException(`Course with id: ${id} not found.`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: createCourseDto.departmentId }
    });

    const registrar = await this.registrarRepo.findOne({
      where: { id: createCourseDto.registrarId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${createCourseDto.departmentId}!`);
    }

    if (!registrar) {
      throw new NotFoundException(`No registrar with id: ${createCourseDto.registrarId}!`);
    }

    const course = this.courseRepo.create({ ...createCourseDto, department, registrar });

    return this.courseRepo.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: updateCourseDto.departmentId }
    });

    const registrar = await this.registrarRepo.findOne({
      where: { id: updateCourseDto.registrarId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${updateCourseDto.departmentId}!`);
    }

    if (!registrar) {
      throw new NotFoundException(`No registrar with id: ${updateCourseDto.registrarId}!`);
    }

    const course = await this.courseRepo.preload({ id: +id, ...updateCourseDto, department, registrar });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found.`);
    }

    return this.courseRepo.update(id, course);
  }

  async delete(id: number) {
    const course = await this.findById(id);

    if (!course) {
      throw new NotFoundException(`Course #${id} not found.`);
    }

    return this.courseRepo.remove(course);
  }
}
