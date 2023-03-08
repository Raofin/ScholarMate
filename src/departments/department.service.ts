import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>
  ) { }

  findAll() {
    return this.departmentRepo.find();
  }

  async findOne(id: number) {
    const department = await this.departmentRepo.findOneBy({ id });

    if (!department) {
      throw new NotFoundException(`Department with id: ${id} not found.`);
    }

    return department;
  }

  create(createDepartmentDto: DepartmentDto) {
    const course = this.departmentRepo.create(createDepartmentDto);
    return this.departmentRepo.save(course);
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const course = await this.departmentRepo.preload({
      id: +id,
      ...updateDepartmentDto
    });

    if (!course) {
      throw new NotFoundException(`Department #${id} not found.`);
    }

    return this.departmentRepo.update(id, course);
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    return this.departmentRepo.remove(department);
  }
}
