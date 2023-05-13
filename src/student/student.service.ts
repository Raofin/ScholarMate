import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/department.entity';
import { LoginDto } from './login.dto';
import { Enrollment } from '../enrollment/enrollment.entity';
import { MailService } from './mail.service';
import { PasswordService } from './password.service';
import { Upload } from '../upload/upload.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Upload)
    private readonly uploadRepo: Repository<Upload>,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService
  ) {
  }

  findAll() {
    return this.studentRepo.find(
      { relations: ['department', 'department.admin', 'department.head'] }
    );
  }

  async findById(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['department', 'department.admin', 'department.head']
    });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return student;
  }

  async register(createStudentDto: CreateStudentDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: createStudentDto.departmentId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${createStudentDto.departmentId}!`);
    }

    const student = this.studentRepo.create({
      ...createStudentDto,
      password: this.passwordService.encodePassword(createStudentDto.password),
      department
    });

    MailService.OTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const emailData = {
      email: student.email,
      subject: 'Registration Successful',
      text: `Dear ${student.name}, Your registration was successful. Your OTP is: ${MailService.OTP}`
    };

    await this.mailService.sendEmail(emailData);

    return this.studentRepo.save(student);
  }

  async verifyOTP(otp: number) {
    if (MailService.OTP == otp) {
      MailService.OTP = null;
      return 'Email verified!';
    }

    return `${MailService.OTP} Invalid OTP! Please try again.`;
  }

  async login(loginDto: LoginDto) {
    const student = await this.studentRepo.findOne({
      where: { email: loginDto.email },
    });

    if (!student) {
      throw new NotFoundException(`Student with email: ${loginDto.email} not found.`);
    }

    if (!this.passwordService.comparePassword(loginDto.password, student.password)) {
      throw new NotFoundException(`Invalid password.`);
    }

    const emailData = {
      email: student.email,
      subject: 'New Login!',
      text: `Dear ${student.name}, We noticed a new login from your account. If this was not you, please contact us immediately!`
    };

    await this.mailService.sendEmail(emailData);

    return student;
  }

  async passwordRecover(email) {
    const student = await this.studentRepo.findOne({
      where: { email }
    });

    return {
      name: student.name,
      email: student.email,
      password: student.password
    }
  }

  async profile(email: string) {
    const student = await this.studentRepo.findOne({
      where: { email },
      relations: ['department', 'department.admin', 'department.head']
    });

    if (!student) {
      throw new NotFoundException(`Student with email: ${email} not found.`);
    }

    return student;
  }

  async update(email: string, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepo.findOne({
      where: { email }
    });

    const department = await this.departmentRepo.findOne({
      where: { id: updateStudentDto.departmentId }
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with email: ${email} not found.`);
    }

    if (!department) {
      throw new NotFoundException(`No departments with id: ${updateStudentDto.departmentId}!`);
    }

    let password = updateStudentDto.password;

    if (password != null) {
      password = this.passwordService.encodePassword(updateStudentDto.password);
    }

    const updatedStudent = await this.studentRepo.preload({
      id: existingStudent.id,
      ...updateStudentDto,
      password,
      department
    });

    return this.studentRepo.update(existingStudent.id, updatedStudent);
  }

  async updateById(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepo.findOne({
      where: { id }
    });

    const department = await this.departmentRepo.findOne({
      where: { id: updateStudentDto.departmentId }
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    if (!department) {
      throw new NotFoundException(`No departments with id: ${updateStudentDto.departmentId}!`);
    }

    let password = updateStudentDto.password;

    if (password != null) {
      password = this.passwordService.encodePassword(updateStudentDto.password);
    }

    const updatedStudent = await this.studentRepo.preload({
      id: existingStudent.id,
      ...updateStudentDto,
      password,
      department
    });

    return this.studentRepo.update(existingStudent.id, updatedStudent);
  }

  async remove(id: number) {
    const student = await this.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return this.studentRepo.remove(student);
  }

  async courses(email: string) {

    const student = await this.studentRepo.findOne({
      where: { email }
    });

    return await this.enrollmentRepo.find({
      where: { student },
      relations: ['course']
    });
  }

  async upload(email: string, filename: string) {
    const student = await this.studentRepo.findOne({
      where: { email }
    });

    const uploadedFile = await this.uploadRepo.save({
      fileName: filename,
      uploadDate: new Date(),
      student: student
    });

    return this.uploadRepo.findOne({
      where: { id: uploadedFile.id },
      relations: ['student']
    });
  }

  async uploads(email: string) {
    const student = await this.studentRepo.findOne({
      where: { email }
    });

    return await this.uploadRepo.find({
      where: { student }
    });
  }
}
