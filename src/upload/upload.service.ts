import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepos: Repository<Upload>
  ) { }

}
