import { IsDate, IsNumber, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEnrollmentDto {
  readonly id: number;

  readonly studentId: number;

  readonly courseId: number;

  @IsString()
  @Length(4, 20, { message: 'Status must be between 4 and 20 characters' })
  readonly status: string;

  @IsDate({ message: 'Enrollment date must be a valid date' })
  readonly enrollmentDate: Date;

  readonly registrarId: number;
}

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {}
