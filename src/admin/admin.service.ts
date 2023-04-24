import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly mailerService: MailerService
  ) {
  }

  findAll() {
    return this.adminRepo.find();
  }

  findById(id: number) {
    const admin = this.adminRepo.findOne({
      where: { id }
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id: ${id} not found.`);
    }

    return admin;
  }

  async register(createAdminDto: CreateAdminDto) {

    const emailData = {
      email: createAdminDto.email,
      subject: 'Registration Successful',
      text: `Dear ${createAdminDto.name}, Your registration was successful.`
    };

    await this.sendEmail(emailData);

    return this.adminRepo.save(createAdminDto);
  }

  async login(myDto) {
    const admin = await this.adminRepo.findOne({
      where: { email: myDto.email }
    });

    if (!admin) {
      throw new NotFoundException(`Admin with email: ${myDto.email} not found.`);
    }

    if (admin.password === myDto.password) {
      return admin;
    }

    throw new NotFoundException(`Incorrect password.`);
  }

  async sendEmail(data) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      text: data.text
    });
  }

  update(id: number, updateAdminDto: CreateAdminDto) {
    const admin = new Admin();
    admin.name = updateAdminDto.name;
    admin.email = updateAdminDto.email;
    admin.password = updateAdminDto.password;
    admin.phone = updateAdminDto.phone;
    admin.joinDate = new Date();

    return this.adminRepo.update(id, admin);
  }

  delete(id: number) {
    const admin = this.adminRepo.findOne({
      where: { id }
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id: ${id} not found.`);
    }

    return this.adminRepo.delete(id);
  }

  myProfile(email: string) {
    return this.adminRepo.findOne({
      where: { email }
    });
  }
}
