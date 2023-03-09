import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Student } from '../student/student.entity';
import { Admin } from '../admin/admin.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Registrar } from '../registrar/registrar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload, Student, Admin, Faculty, Registrar])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
