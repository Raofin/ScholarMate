import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, ValidationPipe, Session, UnauthorizedException
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { LoginDto } from './login.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Session() session,
    @Body() loginDto: LoginDto) {

    if (await this.studentService.login(loginDto)) {
      session.email = loginDto.email;
      return { message: 'Login successful' };
    }

    return { message: 'Login failed' };
  }

  @Get('logout')
  logout(@Session() session) {
    if (session.destroy()) {
      return { message: 'Logout successful' };
    }

    throw new UnauthorizedException('User is not logged in');
  }

  @Get('my-profile')
  profile(@Session() session) {
    if (session.email) {
      return this.studentService.profile(session.email);
    }

    throw new UnauthorizedException('User is not logged in');
  }

  @Get('my-courses')
  myCourses(@Session() session) {
    if (session.email) {
      return this.studentService.courses(session.email);
    }

    throw new UnauthorizedException('User is not logged in');
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findById(id);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.register(createStudentDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }

  @Post('send-email')
  sendEmail() {
    const data = 'hello world';
    return this.studentService.sendEmail(data);
  }
}
