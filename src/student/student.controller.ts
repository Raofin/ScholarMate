import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, ValidationPipe,
  Session, UnauthorizedException, UseInterceptors, UploadedFile,
  ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, Req
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { LoginDto } from './login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { UploadService } from '../upload/upload.service';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService
  ) {  }


  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.register(createStudentDto);
  }

  @Post('verify-email')
  verifyEmail(@Req() req) {
    return this.studentService.verifyOTP(req.body.otp);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Session() session,
    @Body() loginDto: LoginDto
  ) {
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

    throw new UnauthorizedException('You are not logged in');
  }

  @Get('my-profile')
  profile(@Session() session) {
    if (session.email) {
      return this.studentService.profile(session.email);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Patch('my-profile')
  @UsePipes(new ValidationPipe())
  update(
    @Session() session,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    if (session.email) {
      return this.studentService.update(session.email, updateStudentDto);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        }
      })
    })
  )
  async upload(
    @Session() session,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }), // 2MB
          new FileTypeValidator({ fileType: 'png|jpg|jpeg' })
        ]
      })
    ) file: Express.Multer.File) {
    if (session.email) {
      await this.studentService.upload(session.email, file.filename);
      return file;
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Get('my-uploads')
  async myUploads(@Session() session) {
    if (session.email) {
      return this.studentService.uploads(session.email);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Get('my-courses')
  myCourses(@Session() session) {
    if (session.email) {
      return this.studentService.courses(session.email);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Post('enroll-course/:id')
  enroll(
    @Session() session,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (session.email) {
      return this.enrollmentService.enrollCourse(session.email, id);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Delete('drop-course/:id')
  dropCourse(
    @Session() session,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (session.email) {
      return this.enrollmentService.dropCourse(session.email, id);
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }
}
