import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto) {
    const existingStudent = this.studentService.findOne(id);

    if (!existingStudent) {
      throw new Error(`Student with id: ${id} not found.`);
    }

    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }

  /*@Get('/dept/:dept')
  @UsePipes(new ParseEnumPipe(Dept))
  findByDept(@Param('dept') dept) {
    return this.studentService.findByDept(dept);
  }

  @Get('/:id/courses')
  findCoursesById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findCoursesById(id);
  }*/
}
