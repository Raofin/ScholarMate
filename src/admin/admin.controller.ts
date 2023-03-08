import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('departments')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


}
