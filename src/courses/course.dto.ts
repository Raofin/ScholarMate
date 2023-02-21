import { IsEnum, IsNumber, IsString, Length, Matches } from 'class-validator';
import { Dept } from '../departments/department.constants';
import { PartialType } from '@nestjs/mapped-types';

export class CourseDto {
  readonly id: number;

  @IsString({ message: 'Course name must be a string' })
  @Length(4, 20, { message: 'Course name must be between 4 and 20 characters' })
  readonly name: string;

  @IsNumber({}, { message: 'Student ID must be a number' })
  readonly studentId: number;

  @IsEnum(Dept, { message: 'Department must be CSE, EEE, BBA or LLB' })
  readonly dept: Dept;
}

export class UpdateCourseDto extends PartialType(CourseDto) {}