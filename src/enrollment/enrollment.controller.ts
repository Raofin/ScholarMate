import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('departments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

}
