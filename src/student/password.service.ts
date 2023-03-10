import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  encodePassword(rawPassword: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
  }

  comparePassword(rawPassword: string, encodedPassword: string) {
    return bcrypt.compareSync(rawPassword, encodedPassword);
  }
}