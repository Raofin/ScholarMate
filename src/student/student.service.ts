import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/department.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { Enrollment } from '../enrollment/enrollment.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    private readonly mailerService: MailerService
  ) {
  }

  async findAll() {
    return await this.studentRepo.find({
      relations: ['department', 'department.admin', 'department.head']
    });
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
      password: this.encodePassword(createStudentDto.password),
      department
    });

    const emailData = {
      email: student.email,
      subject: 'Registration Successful',
      text: `Dear ${student.name}, Your registration was successful. Your Student ID is ${student.studentId}`,
    };

    await this.sendEmail(emailData);

    return this.studentRepo.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const department = await this.departmentRepo.findOne({
      where: { id: updateStudentDto.departmentId }
    });

    if (!department) {
      throw new NotFoundException(`No departments with id: ${updateStudentDto.departmentId}!`);
    }

    const student = await this.studentRepo.preload({
      id: +id,
      ...updateStudentDto,
      password: this.encodePassword(updateStudentDto.password),
      department
    });

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return this.studentRepo.update(id, student);
  }

  async remove(id: number) {
    const student = await this.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with id: ${id} not found.`);
    }

    return this.studentRepo.remove(student);
  }

  async login(loginDto: LoginDto) {
    const student = await this.studentRepo.findOne({
      where: { email: loginDto.email }
    });

    if (!student) {
      throw new NotFoundException(`Student with email: ${loginDto.email} not found.`);
    }

    if (!this.comparePassword(loginDto.password, student.password)) {
      throw new NotFoundException(`Invalid password.`);
    }

    return student;
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

  async courses(email: string) {

    const student = await this.studentRepo.findOne({
      where: { email }
    });

    return await this.enrollmentRepo.find({
      where: { student }
    });
  }

  encodePassword(rawPassword: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
  }

  comparePassword(rawPassword: string, encodedPassword: string) {
    return bcrypt.compareSync(rawPassword, encodedPassword);
  }

  async sendEmail(data) {
    return await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      text: data.text
    });
  }
}
