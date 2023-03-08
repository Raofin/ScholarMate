import { IsDate, IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacultyDto {
  readonly id: number;

  @Matches(/^\d{4}-\d{4}-\d$/, { message: 'Faculty ID must be in the format ####-####-#' })
  readonly facultyId: string;

  @IsString({ message: 'Name must be a string' })
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  readonly name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  readonly password: number;

  @Matches(/^\d{11}$/, { message: 'Phone must be 11 digits' })
  readonly phone: number;

  @IsDate({ message: 'Join date must be a valid date' })
  readonly joinDate: Date;

  readonly departmentId: number;
}

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {}
