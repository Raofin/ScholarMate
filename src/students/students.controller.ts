import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Post()
  create(@Body() body) {
    return body;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Student ID: ${id}.`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return `Student with #${id} id has been updated.`;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return `Student with #${id} id has been deleted.`;
  }

  @Get()
  find(@Query() paginationQuery) {
    const { id, name } = paginationQuery;
    return `Student ID: ${id}\nStudent Name: ${name}`;
  }

  @Get()
  findById(@Query('id') id: number) {
    return `Student ID: ${id}`;
  }

  @Get()
  findByName(@Query('name') name: string) {
    return `Student ID: ${name}`;
  }

  @Get()
  findByDepartment(@Query('dept') dept: string) {
    return `Students from the department of ${dept}`;
  }

  @Delete()
  deleteByName(@Query('name') name: string) {
    return `${name} has been deleted.`;
  }

  @Delete()
  deleteByEmail(@Query('email') email: any) {
    return `Student with "${email}" email has been deleted.`;
  }

  @Put()
  updateById(@Param('id') id: string, @Body() body) {
    return `Student with #${id} has been updated`;
  }

  @Put()
  updateByEmail(@Param('email') email: string, @Body() body) {
    return `Student with #${email} has been updated`;
  }
}
