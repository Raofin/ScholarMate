import {
  Body, Controller, Delete, Get, Param,
  ParseArrayPipe, ParseEnumPipe, ParseIntPipe,
  Post, Put, Patch, UsePipes, ValidationPipe,
  Session, UnauthorizedException, UseInterceptors, UploadedFile,
  ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, Req, UseGuards
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { LoginDto } from './login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { UploadService } from '../upload/upload.service';
import { SessionGuard } from './session.guard';

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
    session.email = loginDto.email;
    return { message: 'Login successful' };
  }

  @Get('logout')
  @UseGuards(SessionGuard)
  logout(@Session() session) {
    if (session.destroy()) {
      return { message: 'Logout successful' };
    }

    throw new UnauthorizedException('You are not logged in');
  }

  @Get('my-profile')
  @UseGuards(SessionGuard)
  profile(@Session() session) {
    return this.studentService.profile(session.email);
  }

  @Patch('my-profile')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Session() session,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentService.update(session.email, updateStudentDto);
  }

  @Post('upload')
  @UseGuards(SessionGuard)
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
    await this.studentService.upload(session.email, file.filename);
    return file;
  }

  @Get('my-uploads')
  @UseGuards(SessionGuard)
  async myUploads(@Session() session) {
    return this.studentService.uploads(session.email);
  }

  @Get('my-courses')
  @UseGuards(SessionGuard)
  myCourses(@Session() session) {
    return this.studentService.courses(session.email);
  }

  @Post('enroll-course/:id')
  @UseGuards(SessionGuard)
  enroll(
    @Session() session,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.enrollmentService.enrollCourse(session.email, id);
  }

  @Delete('drop-course/:id')
  @UseGuards(SessionGuard)
  dropCourse(
    @Session() session,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.enrollmentService.dropCourse(session.email, id);
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
