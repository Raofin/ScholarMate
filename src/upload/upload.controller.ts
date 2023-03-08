import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('departments')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

}
