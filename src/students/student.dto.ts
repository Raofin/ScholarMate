import { IsDate, IsEmail, IsNumber, IsString, Length, Matches } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class StudentDto {
  readonly id: number;

  @IsString()
  @Matches(/^\d{2}-\d{5}-\d$/, { message: 'Student ID must be in the format ##-#####-#' })
  readonly studentId: string;

  @IsString({ message: 'Name must be a string' })
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  readonly name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  readonly password: string;

  @Matches(/^\d{11}$/, { message: 'Phone must be 11 digits' })
  readonly phone: string;

  @IsNumber({}, { message: 'Credits completed must be a number' })
  readonly creditsCompleted: number;

  @IsNumber({}, { message: 'CGPA must be a number' })
  readonly cgpa: number;

  @IsDate({ message: 'Join date must be a valid date' })
  readonly joinDate: Date;

  @IsNumber({}, { message: 'Department ID must be a number' })
  readonly departmentId: number;
}

export class UpdateStudentDto extends PartialType(StudentDto) {}