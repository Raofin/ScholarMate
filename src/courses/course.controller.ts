import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, NotFoundException
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, UpdateCourseDto } from './course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDto: CourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto) {
    const existingCourse = this.courseService.findOne(id);

    if (!existingCourse) {
      throw new NotFoundException(`Course with id: ${id} not found.`);
    }

    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }
}
