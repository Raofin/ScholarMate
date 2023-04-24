import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Department } from '../department/department.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { PasswordService } from './password.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Registrar } from '../registrar/registrar.entity';
import { Course } from '../course/course.entity';
import { UploadService } from '../upload/upload.service';
import { Upload } from '../upload/upload.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Student, Department, Enrollment, Registrar, Course, Upload]), MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'project.mailer99@gmail.com',
        pass: 'kaigjgpodlsqzeze'
      }
    }
  })],
  controllers: [StudentController],
  providers: [StudentService, MailService, PasswordService, EnrollmentService]
})
export class StudentModule {}
