import { IsEnum, IsNumber, IsString, Length, Matches } from 'class-validator';
import { Dept } from '../departments/department.constants';
import { PartialType } from '@nestjs/mapped-types';

export class StudentDto {
  // @IsNumber({}, { message: 'ID must be a number' })
  readonly id: number;

  @IsString({ message: 'Name must be a string' })
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  readonly name: string;

  @IsString()
  @Matches(/^\d{2}-\d{5}-\d$/, { message: 'Student ID must be in the format ##-#####-#' })
  readonly studentId: string;

  @IsEnum(Dept, { message: 'Department must be CSE, EEE, BBA or LLB' })
  readonly dept: Dept;

  @IsString({ each: true, message: 'Courses must be an array of strings' })
  readonly courses: string[];
}

export class UpdateStudentDto extends PartialType(StudentDto) {}