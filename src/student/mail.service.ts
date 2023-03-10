import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendEmail(data) {
    return await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      text: data.text
    });
  }

  static OTP: number;
}