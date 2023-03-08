import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

}
