import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/course.module';
import { DepartmentModule } from './departments/department.module';

@Module({
  imports: [StudentModule, CoursesModule, DepartmentModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ums',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
