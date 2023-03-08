import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { RegistrarService } from './registrar.service';

@Controller('registrars')
export class RegistrarController {
  constructor(private readonly registrarService: RegistrarService) {}

}
