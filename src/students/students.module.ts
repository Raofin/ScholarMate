import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students.controller';
import { StudentService } from './services/student.service';

@Module({ controllers: [StudentsController], providers: [StudentService] })
export class StudentsModule {}
