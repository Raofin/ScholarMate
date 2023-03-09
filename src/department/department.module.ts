import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Faculty, Admin])],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
