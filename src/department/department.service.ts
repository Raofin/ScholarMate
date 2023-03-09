import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Department } from './department.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Faculty)
    private readonly facultyRepo: Repository<Faculty>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) {
  }

  async findAll() {
    return await this.departmentRepo.find({
      relations: ['head', 'admin']
    });
  }

  async findById(id: number) {
    const department = await this.departmentRepo.findOne({
      where: { id },
      relations: ['head', 'admin']
    });

    if (!department) {
      throw new NotFoundException(`Department with id: ${id} not found.`);
    }

    return department;
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const head = await this.facultyRepo.findOne({
      where: { id: createDepartmentDto.headId }
    });

    const admin = await this.adminRepo.findOne({
      where: { id: createDepartmentDto.adminId }
    });

    if (!head) {
      throw new NotFoundException(`No faculties with the id: ${createDepartmentDto.headId}!`);
    }

    if (!admin) {
      throw new NotFoundException(`Admins with the id: ${createDepartmentDto.adminId}!`);
    }

    const department = this.departmentRepo.create({ ...createDepartmentDto, head, admin });

    return this.departmentRepo.save(department);
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const head = await this.facultyRepo.findOne({
      where: { id: updateDepartmentDto.headId }
    });

    const admin = await this.adminRepo.findOne({
      where: { id: updateDepartmentDto.adminId }
    });

    if (!head) {
      throw new NotFoundException(`No faculties with id: ${updateDepartmentDto.headId}!`);
    }

    if (!admin) {
      throw new NotFoundException(`No admins with id: ${updateDepartmentDto.adminId}!`);
    }

    const department = await this.departmentRepo.preload({ id: id, ...updateDepartmentDto, head, admin });

    if (!department) {
      throw new NotFoundException(`Department #${id} not found.`);
    }

    return this.departmentRepo.update(id, department);
  }

  async remove(id: number) {
    const department = await this.findById(id);

    if (!department) {
      throw new NotFoundException(`Department #${id} not found.`);
    }

    return this.departmentRepo.remove(department);
  }
}
