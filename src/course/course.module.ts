import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Department } from '../department/department.entity';
import { Registrar } from '../registrar/registrar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Department, Registrar])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CoursesModule {}
