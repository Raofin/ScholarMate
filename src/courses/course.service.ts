import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto, UpdateCourseDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) { }

  findAll() {
    return this.courseRepo.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`Course with id: ${id} not found.`);
    }

    return course;
  }

  /*async findByDept(dept: Dept) {
    const courses = await this.courseRepo.findBy({ dept: dept });

    if (!courses) {
      throw new NotFoundException(`There are no courses in the department of ${dept}.`);
    }

    return courses;
  }*/

  create(createCourseDto: CourseDto) {
    const course = this.courseRepo.create(createCourseDto);
    return this.courseRepo.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepo.preload({
      id: +id,
      ...updateCourseDto
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found.`);
    }

    return this.courseRepo.update(id, course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.courseRepo.remove(course);
  }
}
