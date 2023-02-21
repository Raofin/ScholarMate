import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students.controller';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentService]
})
export class StudentsModule {}
