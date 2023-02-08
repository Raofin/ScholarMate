import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/controllers/students.controller';
import { StudentService } from './students/services/student.service';

@Module({
  imports: [],
  controllers: [AppController, StudentsController],
  providers: [AppService, StudentService],
})
export class AppModule {}
