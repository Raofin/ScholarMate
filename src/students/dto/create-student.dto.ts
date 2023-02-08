import { IsEnum, IsNumber, IsString, Length, Matches } from 'class-validator';
import { Department } from '../constants/students.constants';

export class CreateStudentDto {
  @IsNumber({}, { message: 'ID must be a number' })
  readonly id: number;

  @IsString({ message: 'Name must be a string' })
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  readonly name: string;

  @IsString()
  @Matches(/^\d{2}-\d{5}-\d$/, { message: 'Student ID must be in the format ##-#####-#' })
  readonly studentId: string;

  @IsEnum(Department, { message: 'Department must be CSE, EEE, BBA or LLB' })
  readonly dept: Department;

  @IsString({ each: true, message: 'Courses must be an array of strings' })
  readonly courses: string[];
}
