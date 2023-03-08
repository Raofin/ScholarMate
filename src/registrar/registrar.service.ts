import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Registrar } from './registrar.entity';

@Injectable()
export class RegistrarService {
  constructor(
    @InjectRepository(Registrar)
    private readonly registrarRepo: Repository<Registrar>
  ) { }

}
