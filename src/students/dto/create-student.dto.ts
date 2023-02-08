import { IsEnum, IsNumber, IsString, Length, Matches } from 'class-validator';
import { Department } from '../constants/students.constants';

export class CreateStudentDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  @Length(4, 20)
  readonly name: string;

  @IsString()
  @Matches(/^\d{2}-\d{5}-\d$/)
  readonly studentId: string;

  @IsEnum(Department)
  readonly dept: Department;

  @IsString({ each: true })
  readonly courses: string[];
}
