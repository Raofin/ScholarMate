import { IsNumber, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class DepartmentDto {
  readonly id: number;

  @IsString()
  @Length(3, 5, { message: 'Department name must be between 4 and 5 characters' })
  readonly name: string;

  @IsString({ message: 'Course description must be a string' })
  @Length(10, 500, { message: "Department description must be between 10 and 500 characters" })
  readonly description: string;

  @IsNumber({}, { message: 'Head ID must be a number' })
  readonly headId: number;

  @IsNumber({}, { message: 'Admin ID must be a number' })
  readonly adminId: number;
}

export class UpdateDepartmentDto extends PartialType(DepartmentDto) {}
