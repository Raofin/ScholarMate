import { IsNumber, IsString, Length } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateCourseDto {
  readonly id: number;

  @IsString({ message: "Course name must be a string" })
  @Length(4, 20, { message: "Course name must be between 4 and 20 characters" })
  readonly name: string;

  @IsString({ message: "Course code must be a string" })
  @Length(4, 8, { message: "Course code must be between 4 and 8 characters" })
  readonly code: string;

  @IsString({ message: "Course description must be a string" })
  @Length(10, 500, { message: "Course description must be between 10 and 500 characters" })
  readonly description: string;

  @IsNumber({}, { message: "Credit must be a number" })
  readonly credit: number;

  @IsNumber({}, { message: "Department ID must be a number" })
  readonly departmentId: number;

  @IsNumber({}, { message: "Registrar ID must be a number" })
  readonly registrarId: number;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}