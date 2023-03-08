import { IsDate, IsDateString, IsNumber, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUploadDto {
  readonly id: number;

  @IsString({ message: 'Name must be a string' })
  readonly fileName: string;

  @IsDateString()
  readonly uploadDate: Date;

  readonly facultyId: number;

  readonly adminId: number;

  readonly registrarId: number;

  readonly studentId: number;
}

export class UpdateUploadDto extends PartialType(CreateUploadDto) {}
