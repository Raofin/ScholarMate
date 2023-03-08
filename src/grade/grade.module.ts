import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule {}
