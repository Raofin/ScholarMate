import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { Student } from '../student/student.entity';
import { Admin } from '../admin/admin.entity';
import { Registrar } from '../registrar/registrar.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepos: Repository<Upload>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Registrar)
    private readonly registrarRepo: Repository<Registrar>
  ) { }

}
