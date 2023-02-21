import { IsEnum } from 'class-validator';
import { Dept } from './department.constants';
import { PartialType } from '@nestjs/mapped-types';

export class DepartmentDto {
  readonly id: number;

  @IsEnum(Dept, { message: 'Department must be CSE, EEE, BBA or LLB' })
  readonly name: Dept;
}

export class UpdateDepartmentDto extends PartialType(DepartmentDto) {}
