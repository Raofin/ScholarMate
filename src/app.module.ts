import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './course/course.module';
import { DepartmentModule } from './department/department.module';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { RegistrarModule } from './registrar/registrar.module';
import { UploadModule } from './upload/upload.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { GradeModule } from './grade/grade.module';

@Module({
  imports: [
    StudentModule,
    CoursesModule,
    DepartmentModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aiub_portal',
      autoLoadEntities: true,
      synchronize: true
    })]
})
export class AppModule {}
