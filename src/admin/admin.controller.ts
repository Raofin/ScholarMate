import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  UsePipes,
  NotFoundException,
  ValidationPipe,
  Session,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from '../student/session.guard';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.register(createAdminDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Session() session,
    @Body() myDto
  ) {
    if (await this.adminService.login(myDto)) {
      session.email = myDto.email;
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
  @UseGuards(SessionGuard)
  profile(@Session() session) {
      return this.adminService.myProfile(session.email);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.delete(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: CreateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
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
    ) file: Express.Multer.File
  ) {
    return file;
  }

}
