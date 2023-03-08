import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGradeDto {
  readonly id: number;

  readonly courseId: number;

  readonly studentId: number;

  readonly facultyId: number;

  @IsNumber({}, { message: 'Marks must be a number' })
  @Min(0, { message: 'Marks must be greater than or equal to 0' })
  @Max(100, { message: 'Marks must be less than or equal to 100' })
  readonly marks: number;
}

export class UpdateGradeDto extends PartialType(CreateGradeDto) {}
