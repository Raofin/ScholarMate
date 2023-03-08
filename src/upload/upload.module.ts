import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
