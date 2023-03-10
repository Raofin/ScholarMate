import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Department } from '../department/department.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { MailerModule } from "@nestjs-modules/mailer";
import { MailService } from './mail.service';
import { PasswordService } from './password.service';


@Module({
  imports: [TypeOrmModule.forFeature([Student, Department, Enrollment]), MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'project.mailer99@gmail.com',
                       pass: 'onhuenqbjthibixc'
                   },
                  }
      })],
  controllers: [StudentController],
  providers: [StudentService, MailService, PasswordService]
})
export class StudentModule {}
